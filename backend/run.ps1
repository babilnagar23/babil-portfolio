# Start the FastAPI backend on port 8000
Set-Location $PSScriptRoot

if (-not (Test-Path ".env")) {
    Write-Host "Creating .env from .env.example — add your GROQ_API_KEY inside .env"
    Copy-Item ".env.example" ".env"
}

if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..."
    python -m venv venv
}

& .\venv\Scripts\Activate.ps1
pip install -r requirements.txt -q
Write-Host "Starting server at http://127.0.0.1:8000"
uvicorn main:app --reload --host 127.0.0.1 --port 8000
