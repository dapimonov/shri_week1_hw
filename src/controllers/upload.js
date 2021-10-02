const { addImage } = require('../utils/database');

module.exports = async (req, res) => {
  await addImage(req.file.filename, req.file.size, new Date().toISOString());
  return res.json({ id: req.file.filename });
};
