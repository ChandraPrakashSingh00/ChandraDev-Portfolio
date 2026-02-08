const express = require("express");
const { sendContact } = require("../controllers/contact.controller");
const validateFields = require("../middlewares/validate.middleware");

const router = express.Router();

router.post(
  "/",
  validateFields(["name", "email", "message"]),
  sendContact
);

module.exports = router;
