@echo off
title Goel Cake House - First Time Setup
color 0B
echo.
echo  ================================================
echo   GOEL CAKE HOUSE - First Time Setup
echo   This seeds the database with sample products
echo  ================================================
echo.

cd /d "%~dp0backend"

echo  Installing dependencies...
call npm install
echo.

echo  Seeding database with products...
node utils/seed.js
echo.

echo  ================================================
echo   Setup complete!
echo   Admin Login: admin@goelcakehouse.com
echo   Password:    Admin@12345
echo  ================================================
echo.
pause
