const {deleteImage} = require("../utils/database");

module.exports = async (req, res) => {
  const deletedNumber = await deleteImage(req.params.id);
  return deletedNumber ? res.json({id: req.params.id}) : res.status(404).send('Not found');
};