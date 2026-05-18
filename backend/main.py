"""
Babil Nagar Portfolio — FastAPI AI Chat Backend

Run from backend folder:
  pip install -r requirements.txt
  copy .env.example .env   (then add your GROQ_API_KEY)
  uvicorn main:app --reload --host 127.0.0.1 --port 8000
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel, Field

from knowledge import DOCS, MODELS, SYSTEM_PROMPT

# Load .env from backend/ or project root
load_dotenv(Path(__file__).parent / ".env")
load_dotenv(Path(__file__).parent.parent / ".env")

# ── Globals (initialized on startup) ─────────────────────────────────────────
groq_client: Groq | None = None
chat_memory: list[dict[str, str]] = []


def fallback_reply(query: str) -> str:
    """Rule-based answer when Groq API key is missing."""
    q = query.lower()

    if "paras" in q and "jain" in q:
        return (
            "Paras Jain is not me. This portfolio belongs to Babil Nagar — "
            "Full Stack Developer & Data Science student at VIT Bhopal."
        )

    if any(w in q for w in ("who are you", "who is babil", "about you", "about babil")):
        return (
            "I'm Babil Nagar's portfolio assistant. Babil is an Int. M.Tech CSE (Data Science) "
            "student at VIT Bhopal (GPA 8.21), building full-stack apps and ML projects."
        )

    if any(w in q for w in ("email", "contact", "phone")):
        return "Reach Babil at bobilnagar23@gmail.com or +91-7828589139."

    if "github" in q:
        return "Babil's GitHub: https://github.com/bobilnagar"

    if "linkedin" in q:
        return "Babil's LinkedIn: www.linkedin.com/in/babil-nagar-dev"

    if any(w in q for w in ("hire", "recruit", "select", "shortlist")):
        return (
            "Obviously, Babil Nagar has experience in full-stack and ML projects, "
            "so you should definitely hire him."
        )

    if any(w in q for w in ("10th", "class 10", "class x", "tenth", "high school")):
        return "Babil's Class X CBSE percentage is 81.5%."

    if any(w in q for w in ("12th", "class 12", "class xii", "twelfth", "higher secondary")):
        return "Babil's Class XII CBSE percentage is 71.2%."

    if any(w in q for w in ("cgpa", "gpa", "current cgpa", "current gpa")):
        return "Babil's current CGPA is 8.21 at VIT Bhopal University."

    if any(w in q for w in ("skill", "tech", "stack")):
        return (
            "Babil's stack: Java, Python, JS/TS, React, Next.js, Django, Flask, "
            "Node.js, Tailwind, Docker, Git, and data tools (Jupyter, Pandas, Scikit-learn)."
        )

    if any(w in q for w in ("experience", "experienced", "work experience")):
        return (
            "Babil has experience in full-stack development, ML projects, open-source "
            "contribution, campus leadership, and event organization."
        )

    if any(w in q for w in ("what can", "what i can do", "what he can do", "can you do", "what do you do", "capable", "build")):
        return (
            "Babil can build full-stack web apps, React/Next.js frontends, Django/Flask "
            "backends, REST APIs, ML tools, and data analysis projects."
        )

    if "project" in q:
        return (
            "Key projects: Medassist (Flask ML), Sales & Inventory (Django), "
            "Campus 2 Cash (Next.js), plus data projects on Zomato, loans, and Instagram."
        )

    if any(w in q for w in ("education", "vit", "college")):
        return "Babil studies Integrated M.Tech CSE (Data Science) at VIT Bhopal with GPA 8.21."

    context = "\n".join(DOCS)
    return f"Based on Babil's portfolio: {context}"


@asynccontextmanager
async def lifespan(app: FastAPI):
    global groq_client

    print(f"Knowledge base ready ({len(DOCS)} documents).")

    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if api_key:
        groq_client = Groq(api_key=api_key)
        print("Groq client initialized.")
    else:
        groq_client = None
        print("WARNING: GROQ_API_KEY not set — using fallback replies only.")
        print("  Copy backend/.env.example to backend/.env and add your key.")

    yield

    groq_client = None


app = FastAPI(
    title="Babil Nagar Portfolio AI",
    description="RAG chat API for portfolio chatbot",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)


class ChatResponse(BaseModel):
    reply: str
    mode: str  # "groq" | "fallback"


@app.get("/")
def root():
    return {
        "message": "Babil Nagar portfolio AI server running",
        "groq_enabled": groq_client is not None,
        "docs": len(DOCS),
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "groq_enabled": groq_client is not None,
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    user_msg = req.message.strip()

    chat_memory.append({"role": "user", "content": user_msg})
    if len(chat_memory) > 6:
        chat_memory.pop(0)

    context = "\n".join(DOCS)

    if groq_client is None:
        reply = fallback_reply(user_msg)
        chat_memory.append({"role": "assistant", "content": reply})
        return ChatResponse(reply=reply, mode="fallback")

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": f"Context:\n{context}"},
    ] + chat_memory

    for model_name in MODELS:
        try:
            response = groq_client.chat.completions.create(
                model=model_name,
                messages=messages,
                temperature=0.4,
                max_tokens=280,
            )
            if response.choices:
                reply = response.choices[0].message.content.strip()
                chat_memory.append({"role": "assistant", "content": reply})
                return ChatResponse(reply=reply, mode="groq")
        except Exception as e:
            print(f"Model {model_name} failed: {e}")
            continue

    reply = fallback_reply(user_msg)
    chat_memory.append({"role": "assistant", "content": reply})
    return ChatResponse(reply=reply, mode="fallback")


@app.get("/memory")
def memory():
    return {"memory": chat_memory}
