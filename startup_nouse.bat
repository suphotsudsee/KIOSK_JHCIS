@echo off
echo Starting KIOSK JHCIS...

:: ตั้งค่า working directory
cd /d "C:\Program Files\kiosk_jhcis"

:: รอให้ระบบพร้อม (30 วินาที)
timeout /t 30 /nobreak

:: ตรวจสอบและรัน NHSO Smart Card Service
sc query NHSOSecureSmartCardAgent > nul
if errorlevel 1 (
    echo Starting NHSO Smart Card Service...
    net start NHSOSecureSmartCardAgent
    timeout /t 10 /nobreak
)

:: เริ่ม Backend Server
cd backend
start /min cmd /k "node index.js"

:: รอให้ backend พร้อม (10 วินาที)
timeout /t 10 /nobreak

:: เริ่ม Frontend
cd frontend
start /min cmd /k "node server/index.mjs"

:: เปิด browser ในโหมด kiosk พร้อมการตั้งค่าที่ต้องการ
timeout /t 5 /nobreak
start chrome --kiosk --kiosk-printing --kiosk-print --overscroll-history-navigation=0 http://localhost:3000

