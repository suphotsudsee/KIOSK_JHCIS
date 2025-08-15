# KIOSK JHCIS Backend Documentation

## ระบบ Backend สำหรับ KIOSK JHCIS

ระบบ backend รองรับการทำงานของ KIOSK JHCIS โดยมีหน้าที่หลักในการจัดการข้อมูลบัตรประชาชน, สิทธิการรักษา, และการเข้ารับบริการ

### 1. โครงสร้างระบบ

```
backend/
├── src/
│   ├── controller/        # Controllers จัดการ business logic
│   ├── models/           # Models จัดการการเข้าถึงฐานข้อมูล
│   ├── routes/          # Route definitions
│   └── _helpers/        # Utility functions
├── config/              # Configuration files
└── logs/               # Log files
```

### 2. การทำงานหลัก

#### 2.1 Smart Card Reader Service
```javascript
// smartcard.model.js
const Smartcard = {
  read: async (data, res) => {
    // อ่านข้อมูลจากบัตรประชาชน
    // ใช้ @privageapp/thai-national-id-reader
  }
}
```

#### 2.2 NHSO Service Integration
```javascript
// closeright.controller.js
const closeRight = async (req, res) => {
  // ตรวจสอบและบันทึกการใช้สิทธิ
  // เชื่อมต่อกับ NHSO API
}
```

### 3. APIs

#### 3.1 Smart Card APIs
- `GET /api/read` - อ่านข้อมูลบัตรประชาชน
- `GET /api/smartcard/read-card-only` - อ่านเฉพาะข้อมูลบัตร
- `GET /api/smartcard/read` - อ่านข้อมูลบัตรและสิทธิ

#### 3.2 Visit APIs
- `GET /api/visit/:visitno` - ดึงข้อมูลการเข้ารับบริการ
- `GET /api/visit/cid/:cid` - ดึงประวัติการเข้ารับบริการ
- `POST /api/visit/newvisit` - บันทึกการเข้ารับบริการใหม่

#### 3.3 Person APIs
- `GET /api/person/:cid` - ดึงข้อมูลบุคคล
- `POST /api/person` - เพิ่มข้อมูลบุคคลใหม่
- `PATCH /api/person/:pid` - อัพเดทข้อมูลบุคคล

### 4. Dependencies หลัก

```json
{
  "@privageapp/thai-national-id-reader": "^x.x.x",  // อ่านบัตรประชาชน
  "knex": "^x.x.x",                                 // Database ORM
  "express": "^x.x.x",                             // Web framework
  "winston": "^x.x.x"                              // Logging
}
```

### 5. การตั้งค่าระบบ

#### 5.1 Environment Variables
```env
# Database
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB_NAME=jhcis

# NHSO API
NHSO_API_URL=https://api.nhso.go.th
TOKEN=your_token

# Smart Card Reader
READER_PORT=8189
```

#### 5.2 Database Configuration
```javascript
// config/database.js
module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
}
```

### 6. Error Handling

#### 6.1 Smart Card Errors
```javascript
try {
  const reader = new ThaiCardReader();
  // ... การอ่านบัตร
} catch (error) {
  logger.error('Smart card reading error:', error);
  return res.status(500).json({
    ok: false,
    message: 'ไม่สามารถอ่านบัตรได้',
    error: error.message
  });
}
```

#### 6.2 Database Errors
```javascript
knex('person')
  .where('idcard', cid)
  .then(person => {
    // ... process data
  })
  .catch(err => {
    logger.error('Database error:', err);
    res.status(500).json({
      ok: false,
      message: 'เกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูล',
      error: err.message
    });
  });
```

### 7. Logging

ระบบใช้ Winston สำหรับการเก็บ log:

```javascript
// _helpers/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

### 8. การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. ตั้งค่า environment variables:
```bash
cp .env.example .env
# แก้ไขไฟล์ .env ตามการตั้งค่าของคุณ
```

3. รัน database migrations:
```bash
npm run migrate
```

4. รันเซิร์ฟเวอร์:
```bash
npm run dev  # สำหรับ development
npm start    # สำหรับ production
```

### 9. การแก้ไขปัญหาเบื้องต้น

1. **Smart Card Reader ไม่ทำงาน**:
   - ตรวจสอบการติดตั้ง NHSOSecureSmartCardAgent
   - ตรวจสอบ port ที่ใช้งาน (default: 8189)
   - ดู logs ใน `logs/error.log`

2. **Database Connection Error**:
   - ตรวจสอบการตั้งค่าใน .env
   - ตรวจสอบ database service
   - ตรวจสอบ firewall

3. **NHSO API Error**:
   - ตรวจสอบ token
   - ตรวจสอบการเชื่อมต่อ internet
   - ตรวจสอบ NHSO API status

### 10. การพัฒนาต่อ

1. เพิ่ม API Documentation (Swagger)
2. เพิ่ม Unit Tests
3. เพิ่ม Rate Limiting
4. เพิ่ม Caching
5. ปรับปรุงระบบ Logging
6. เพิ่มระบบ Monitoring

### 11. Security

1. **API Security**:
   - ใช้ HTTPS
   - ตรวจสอบ token
   - Rate limiting
   - Input validation

2. **Database Security**:
   - Prepared statements
   - Connection pooling
   - Minimal privileges

3. **Smart Card Security**:
   - ข้อมูลบัตรไม่ถูกเก็บในระบบ
   - ลบข้อมูลอ่อนไหวหลังใช้งาน
   - Logging การเข้าถึง
