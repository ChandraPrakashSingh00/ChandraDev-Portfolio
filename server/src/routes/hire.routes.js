const express = require("express");
const { hireRequest } = require("../controllers/hire.controller");
const validateFields = require("../middlewares/validate.middleware");

const router = express.Router();

router.post(
  "/",
  validateFields(["name", "email", "projectDetails"]),
  hireRequest
);

module.exports = router;
