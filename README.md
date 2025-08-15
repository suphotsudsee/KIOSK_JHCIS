# KIOSK_JHCIS

โปรเจ็กต์นี้ประกอบด้วยระบบ **Backend** และ **Frontend** สำหรับ KIOSK JHCIS

## การติดตั้ง Backend

1. เข้าไปที่โฟลเดอร์ `backend`
   ```bash
   cd backend
   npm install
   ```
2. คัดลอกไฟล์ตัวอย่าง environment แล้วปรับค่าตามระบบของคุณ
   ```bash
   cp .env.example .env
   ```
3. เริ่มใช้งานเซิร์ฟเวอร์
   ```bash
   npm start
   ```

## การติดตั้ง Frontend

1. เข้าไปที่โฟลเดอร์ `frontend_vite`
   ```bash
   cd frontend_vite
   npm install
   ```
2. เริ่มใช้งานโหมดพัฒนา
   ```bash
   npm run dev
   ```
   หรือ build สำหรับ production
   ```bash
   npm run build
   ```
