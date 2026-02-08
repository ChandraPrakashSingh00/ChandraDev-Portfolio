const Contact = require("../models/Contact.model");

const sendContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendContact };
