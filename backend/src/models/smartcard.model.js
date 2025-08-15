/**
 * Smart Card Model
 * รับผิดชอบการอ่านข้อมูลจากบัตรประชาชนผ่าน NHSO Smart Card Reader
 * 
 * Dependencies:
 * - @privageapp/thai-national-id-reader: สำหรับติดต่อกับ card reader
 * - NHSOSecureSmartCardAgent: ต้องติดตั้งและรันเป็น Windows Service
 */

const {
  ThaiCardReader,
  EVENTS,
  MODE,
} = require("@privageapp/thai-national-id-reader");
const logger = require("../_helpers/logger");

/**
 * Smartcard class สำหรับจัดการการอ่านบัตรประชาชน
 */
const Smartcard = (smartcard) => {};

/**
 * อ่านข้อมูลจากบัตรประชาชน
 * 
 * @param {Object} data - ข้อมูลจาก request (ไม่ได้ใช้แต่เก็บไว้เพื่อ consistency)
 * @param {Function} res - callback function(error, data)
 * @returns {void}
 * 
 * Events ที่เกิดขึ้นระหว่างการอ่านบัตร:
 * 1. PCSC_INITIAL - เริ่มต้นการเชื่อมต่อกับ card reader
 * 2. DEVICE_WAITING - รอการเชื่อมต่อกับ card reader
 * 3. DEVICE_CONNECTED - เชื่อมต่อกับ card reader สำเร็จ
 * 4. CARD_INSERTED - มีการเสียบบัตร
 * 5. READING_INIT - เริ่มอ่านข้อมูล
 * 6. READING_COMPLETE - อ่านข้อมูลเสร็จ
 * 7. CARD_REMOVED - มีการดึงบัตรออก
 */
Smartcard.read = (data, res) => {
  let card = null;

  try {
    // สร้าง instance ของ card reader
    const reader = new ThaiCardReader();
    reader.readMode = MODE.PERSONAL_PHOTO; // อ่านรวมรูปถ่าย
    reader.autoRecreate = false;
    reader.startListener();

    // Event Handlers
    // ==============

    // 1. การเชื่อมต่อเริ่มต้น
    reader.on(EVENTS.PCSC_INITIAL, () => {
      logger.info("Card reader service initialized");
    });

    reader.on(EVENTS.PCSC_CLOSE, () => {
      logger.info("Card reader service closed");
    });

    // 2. สถานะของ card reader
    reader.on(EVENTS.DEVICE_WAITING, () => {
      logger.info("Waiting for card reader device");
    });

    reader.on(EVENTS.DEVICE_CONNECTED, () => {
      logger.info("Card reader device connected");
    });

    reader.on(EVENTS.DEVICE_ERROR, () => {
      logger.error("Card reader device error occurred");
    });

    reader.on(EVENTS.DEVICE_DISCONNECTED, () => {
      logger.info("Card reader device disconnected");
    });

    // 3. การจัดการบัตร
    reader.on(EVENTS.CARD_INSERTED, () => {
      logger.info("ID card inserted - ready to read");
    });

    reader.on(EVENTS.CARD_REMOVED, () => {
      logger.info("ID card removed from reader");
      return;
    });

    // 4. กระบวนการอ่านข้อมูล
    reader.on(EVENTS.READING_INIT, () => {
      logger.info("Initializing card reading process");
    });

    reader.on(EVENTS.READING_START, () => {
      logger.info("Starting to read card data");
    });

    reader.on(EVENTS.READING_PROGRESS, (progress) => {
      logger.info("Reading progress:", progress);
    });

    reader.on(EVENTS.READING_FAIL, () => {
      logger.error("Failed to read card data");
      res({ message: "not_found" }, null);
    });

    // 5. การจัดการผลลัพธ์
    reader.on(EVENTS.READING_COMPLETE, (cardData) => {
      if (cardData) {
        // อ่านข้อมูลสำเร็จ
        logger.info("Card reading completed successfully");
        res(null, cardData);
        return;
      } else {
        // ไม่พบข้อมูล
        logger.warn("No card data found");
        res({ message: "not_found" }, null);
        reader.removeAllListeners();
      }
    });

  } catch (error) {
    logger.error("Critical error in card reading process:", error.toString());
    return;
  }
};

module.exports = Smartcard;
