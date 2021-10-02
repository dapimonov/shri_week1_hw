const fs = require('fs');
const sizeOf = require('image-size');
const {hexToRgb} = require("../utils/hexToRgb");
const { replaceBackground } = require('backrem');
const { filesFolder } = require('../config');

module.exports = async (req, res) => {
  const backPath = filesFolder + req.query.back;
  const frontPath = filesFolder + req.query.front;
  const backDimensions = sizeOf(backPath);
  const frontDimensions = sizeOf(frontPath);
  if (
    backDimensions.width === frontDimensions.width &&
    backDimensions.height === frontDimensions.height
  ) {
    const backStream = fs.createReadStream(backPath);
    const frontStream = fs.createReadStream(frontPath);
    const color = req.query.color.startsWith('#')
      ? hexToRgb(req.query.color)
      : req.query.color.split(',');
    const threshold = req.query.threshold;
    replaceBackground(
      frontStream,
      backStream,
      color,
      threshold
    ).then((readableStream) => {
      res.setHeader('Content-Disposition', 'attachment: filename="result.jpg"');
      res.setHeader("Content-Type", "image/jpeg");
      readableStream.pipe(res);
    });
  } else {
    res.status(400).send('Wrong size');
  }
};
