const fs = require('fs');
const {getImage} = require("../utils/database");
const {filesFolder} = require("../config");

module.exports = async (req, res) => {
  const image = await getImage(req.params.id);
  if (image) {
    const path = filesFolder + req.params.id;
    const file = fs.createReadStream(path);
    res.setHeader('Content-Disposition', 'attachment; filename="' + req.params.id + '.jpg"');
    res.setHeader("Content-Type", "image/jpeg");
    file.pipe(res);
  } else {
    res.status(404).send('Not found');
  }
};