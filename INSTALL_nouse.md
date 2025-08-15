# คู่มือการติดตั้งระบบ KIOSK JHCIS

## ความต้องการของระบบ
1. Windows 10 หรือสูงกว่า
2. Node.js เวอร์ชั่น 18.13.0 (ต้องใช้เวอร์ชั่นนี้เท่านั้น)
3. เครื่องอ่านบัตรประชาชน
4. การเชื่อมต่ออินเทอร์เน็ตสำหรับเชื่อมต่อฐานข้อมูล

## ขั้นตอนการติดตั้ง

### 1. ติดตั้ง Node.js 18.13.0
1. ดาวน์โหลด Node.js 18.13.0 จาก https://nodejs.org/download/release/v18.13.0/
   - สำหรับ Windows 64-bit: node-v18.13.0-x64.msi
   - สำหรับ Windows 32-bit: node-v18.13.0-x86.msi
2. ติดตั้ง Node.js โดยเลือก "Automatically install the necessary tools"
3. ตรวจสอบเวอร์ชั่นหลังติดตั้งด้วยคำสั่ง:
```bash
node --version
# ต้องแสดง v18.13.0
```

### 2. ติดตั้ง NHSO Smart Card Service
1. เปิดโฟลเดอร์ `secureagent-1.1.1`
2. คลิกขวาที่ `install.bat` และเลือก "Run as Administrator"
3. รอจนการติดตั้งเสร็จสิ้น

### 3. ติดตั้งโปรแกรม KIOSK JHCIS
1. คัดลอกโฟลเดอร์ `kiosk_jhcis` ไปที่ `C:\Program Files`
2. เปิด Command Prompt ด้วยสิทธิ์ Administrator
3. รันคำสั่งต่อไปนี้:
```bash
cd "C:\Program Files\kiosk_jhcis"
npm install
```

### 4. ตั้งค่าการเชื่อมต่อฐานข้อมูล
1. เปิดไฟล์ `C:\Program Files\kiosk_jhcis\backend\.env`
2. แก้ไขการตั้งค่าการเชื่อมต่อฐานข้อมูล:
```env
# ตั้งค่าการเชื่อมต่อฐานข้อมูล
DB_HOST=<ที่อยู่ server ฐานข้อมูล>
DB_USER=<username>
DB_PASS=<password>
DB_NAME=jhcis
DB_PORT=<port ของฐานข้อมูล เช่น 3306>

# ตั้งค่า Smart Card Reader
READER_PORT=8189
```

### 5. ตั้งค่าให้โปรแกรมทำงานอัตโนมัติ
1. คัดลอกไฟล์ `startup.bat` ไปที่:
   `C:\Users\[USERNAME]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
2. แก้ไขไฟล์ `startup.bat` ให้ชี้ไปที่ path ที่ถูกต้อง

### 6. ทดสอบระบบ
1. ทดสอบการเชื่อมต่อฐานข้อมูล:
```bash
cd "C:\Program Files\kiosk_jhcis\backend"
npm run test-db
```
2. รีสตาร์ทเครื่อง
3. ระบบควรจะเปิดขึ้นมาโดยอัตโนมัติ
4. ทดสอบอ่านบัตรประชาชน

## การแก้ไขปัญหา

### 1. Node.js ไม่ใช่เวอร์ชั่น 18.13.0
- ถอนการติดตั้ง Node.js เวอร์ชั่นปัจจุบัน
- ดาวน์โหลดและติดตั้ง Node.js 18.13.0
- ตรวจสอบเวอร์ชั่นด้วย `node --version`

### 2. ไม่สามารถเชื่อมต่อฐานข้อมูล
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- ตรวจสอบการตั้งค่าใน `.env`
- ตรวจสอบว่าสามารถ ping ไปยัง database server ได้
- ตรวจสอบ firewall ว่าอนุญาตการเชื่อมต่อ
- ติดต่อผู้ดูแลระบบฐานข้อมูลเพื่อตรวจสอบสิทธิ์การเข้าถึง

### 3. อ่านบัตรไม่ได้
- ตรวจสอบว่า NHSO Smart Card Service ทำงานอยู่
- รันคำสั่ง `services.msc` และดูว่า "NHSOSecureSmartCardAgent" ทำงานอยู่
- ลองรีสตาร์ท service

### 4. โปรแกรมไม่เปิดอัตโนมัติ
- ตรวจสอบว่าไฟล์ `startup.bat` อยู่ใน Startup folder
- ตรวจสอบ path ใน `startup.bat`
- ตรวจสอบสิทธิ์การเข้าถึงไฟล์

## การอัพเดทโปรแกรม
1. สำรองไฟล์ `.env` ที่มีการตั้งค่าฐานข้อมูล
2. คัดลอกไฟล์เวอร์ชั่นใหม่ทับไฟล์เดิม
3. คัดลอกไฟล์ `.env` กลับคืน
4. เปิด Command Prompt ด้วยสิทธิ์ Administrator
5. รันคำสั่ง:
```bash
cd "C:\Program Files\kiosk_jhcis"
npm install
```

## การสำรองข้อมูล
- สำรองไฟล์ `.env` ที่มีการตั้งค่าการเชื่อมต่อฐานข้อมูล
- เก็บ backup ไว้ในที่ปลอดภัย 