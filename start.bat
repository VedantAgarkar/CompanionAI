@echo off
TITLE CompanionAI Starter
echo.
echo ==========================================
echo    Starting CompanionAI Services...
echo ==========================================
echo.

:: Start Backend
echo Launching Backend (FastAPI)...
start "CompanionAI Backend" cmd /k "cd backend && python main.py"

:: Start Frontend
echo Launching Frontend (Vite)...
start "CompanionAI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo    Both services have been launched!
echo    - Backend: http://localhost:8000
echo    - Frontend: http://localhost:5173 (usually)
echo ==========================================
echo.
pause
