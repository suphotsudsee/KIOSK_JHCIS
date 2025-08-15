@echo off
:: Kill any existing Chrome processes
taskkill /F /IM chrome.exe /T

:: Wait for a moment
timeout /t 2

:: Start Chrome in kiosk mode with rotation
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --force-device-scale-factor=1 --start-fullscreen --window-position=0,0 --window-size=1080,1920 http://localhost:3000

:: Start PM2 processes
cd /d %~dp0
pm2 start ecosystem.config.js
pm2 save 