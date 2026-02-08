const validateFields = (fields) => {
  return (req, res, next) => {
    for (let field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }
    next();
  };
};

module.exports = validateFields;
