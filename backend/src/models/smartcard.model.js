/**
 * Smart Card Model
 * รับผิดชอบการอ่านข้อมูลจากบัตรประชาชนผ่าน NHSO Smart Card Reader
 * 
 * Dependencies:
 * - @privageapp/thai-national-id-reader: สำหรับติดต่อกับ card reader
 * - NHSOSecureSmartCardAgent: ต้องติดตั้งและรันเป็น Windows Service
 */

const { ThaiCardReader, MODE } = require("@privageapp/thai-national-id-reader");
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
 */
Smartcard.read = async (data, res) => {
  try {
    // สร้าง instance ของ card reader และอ่านข้อมูลทันทีเมื่อกดปุ่ม
    const reader = new ThaiCardReader();
    reader.readMode = MODE.PERSONAL_PHOTO; // อ่านรวมรูปถ่าย

    const cardData = await reader.readAllPhoto();

    if (cardData) {
      // อ่านข้อมูลสำเร็จ
      logger.info("Card reading completed successfully");
      res(null, cardData);
    } else {
      // ไม่พบบัตรหรืออ่านไม่ได้
      logger.warn("No card data found");
      res({ message: "not_found" }, null);
    }
  } catch (error) {
    // กรณีเกิดข้อผิดพลาดหรือไม่มีการเสียบบัตร
    logger.error("Critical error in card reading process:", error.toString());
    res({ message: "not_found" }, null);
  }
};

module.exports = Smartcard;
