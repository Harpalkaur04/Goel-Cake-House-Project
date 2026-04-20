@echo off
title Goel Cake House - Backend Server
color 0A
echo.
echo  ================================================
echo   GOEL CAKE HOUSE - Starting Backend Server
echo  ================================================
echo.

cd /d "%~dp0backend"

echo  [1/2] Installing dependencies (first time only)...
call npm install
echo.

echo  [2/2] Starting server on http://localhost:5000
echo.
echo  Keep this window open while using the website.
echo  Press Ctrl+C to stop the server.
echo.
node server.js

pause
