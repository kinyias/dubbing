@echo off
chcp 65001 >nul
title Dubbing Studio - Frontend & API Server
echo ===============================================================
echo   Khoi chay Dubbing Studio (Frontend + API Server)...
echo ===============================================================
python main.py
if errorlevel 1 (
    echo.
    echo Co loi xay ra khi chay server. Vui long kiem tra lai Python va moi truong.
    pause
)
