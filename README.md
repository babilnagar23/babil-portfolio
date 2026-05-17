# Paras Jain — Portfolio (Next.js)

Modern portfolio built with **Next.js App Router**, **Tailwind CSS**, **Framer Motion**, and **React Icons**.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3
- Framer Motion
- React Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/              # Layout & page
├── components/
│   ├── effects/      # Particle background, custom cursor
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Skills, etc.
│   └── ui/           # Reusable cards, chatbot
├── data/             # Portfolio content
└── hooks/            # Typing, counter, 3D tilt
```

## AI chatbot (optional)

The chat widget calls a FastAPI backend at `http://127.0.0.1:8000/chat`. Run your Python server separately with `GROQ_API_KEY` set.

## Build

```bash
npm run build
npm start
```
