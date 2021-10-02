const express = require('express');
const { nanoid } = require('nanoid');
const multer = require('multer');
const { upload, list, getImage, deleteImage, merge } = require('./controllers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files/');
  },
  filename: (req, file, cb) => {
    cb(null, nanoid());
  },
});

const uploadFile = multer({ storage: storage });

const appRouter = new express.Router();

appRouter.post('/upload', uploadFile.single('image'), upload);
appRouter.get('/list', list);
appRouter.get('/image/:id', getImage);
appRouter.delete('/image/:id', deleteImage);
appRouter.get('/merge', merge);
appRouter.get('*', (req, res) => {
  res.status(404).send('Not found');
});

exports.appRouter = appRouter;
