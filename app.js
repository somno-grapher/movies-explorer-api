require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT, DB_URL } = require('./config');
const router = require('./routes');
const handleError = require('./utils/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());

app.use(helmet());

app.use(requestLogger);

app.use(cors());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

mongoose.connect(DB_URL)
  .then(() => {
    console.log('База данных подключена');
    app.listen(PORT, () => {
      console.log(`Сервер подключен к порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе данных', err);
    app.exit(1);
  });
