const Contact = require("../models/Contact.model");

exports.sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false });
    }

    await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
