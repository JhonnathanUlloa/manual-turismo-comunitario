@echo off
cls
echo.
echo ========================================
echo   MANUAL INTERACTIVO - TURISMO
echo   Servidor de Desarrollo
echo ========================================
echo.
echo Iniciando servidor...
echo.
echo Presiona Ctrl+C para detener
echo.

cd /d "%~dp0"
npm run dev

pause
