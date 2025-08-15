/**
 * Smart Card Controller
 * จัดการ HTTP endpoints สำหรับการอ่านบัตรประชาชนและตรวจสอบสิทธิ
 * 
 * Endpoints:
 * - GET /api/read - อ่านข้อมูลบัตรประชาชน
 * - GET /api/smartcard/read-card-only - อ่านเฉพาะข้อมูลบัตร
 * - GET /api/smartcard/read - อ่านข้อมูลบัตรและสิทธิ
 */

const smartcard = require("../models/smartcard.model");
const logger = require("../_helpers/logger");

/**
 * อ่านข้อมูลจากบัตรประชาชน
 * 
 * @route GET /api/read
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response:
 *   - ok: boolean สถานะการทำงาน
 *   - message: ข้อความแสดงผล
 *   - data: ข้อมูลบัตรประชาชน (ถ้าสำเร็จ)
 *   - error: ข้อความ error (ถ้าไม่สำเร็จ)
 */
exports.read = (req, res) => {
  smartcard.read(req, (err, data) => {
    try {
      if (err) {
        if (err.message === "not_found") {
          // กรณีไม่พบบัตร/ดึงบัตรออก
          logger.warn("Card reading failed: Card not found or removed");
          res.status(400).send({
            ok: false,
            message: "กรุณาเสียบบัตรประชาชน",
            error: null,
          });
          return;
        } else {
          // กรณีเกิด error อื่นๆ
          logger.error("Card reading error:", err.toString());
          res.status(500).send({
            ok: false,
            message: "เกิดข้อผิดพลาดในการอ่านบัตร",
            error: err.toString(),
          });
        }
      } else {
        // อ่านข้อมูลสำเร็จ
        logger.info("Card data read successfully");
        res.status(200).send({
          ok: true,
          message: "อ่านข้อมูลบัตรสำเร็จ",
          data: data,
        });
      }
    } catch (error) {
      // กรณีเกิด error ที่ไม่คาดคิด
      logger.error("Unexpected error in card reading controller:", error.toString());
      res.status(400).send({
        ok: false,
        message: "เกิดข้อผิดพลาดที่ไม่คาดคิด",
        error: error.toString(),
      });
    }
  });
};
