const express = require('express');
const database = require('./utils/database');
const { PORT } = require('./config');
const { appRouter } = require('./router');

const app = express();

app.use('/', appRouter);

database.initialize();

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
