const { getImages } = require('../utils/database');

module.exports = async (req, res) => {
  const images = await getImages();
  return res.json(images);
};
