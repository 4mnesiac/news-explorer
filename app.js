/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/ratelimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/errors');
const routes = require('./routes/index');

const whitelist = ['http://localhost:8080', 'https://4mnesiac.github.io/news-explorer-frontend/pages/index.html#',
  'https://4mnesiac.github.io', 'https://nhance.tk/', 'http://nhance.tk/'];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const {
  PORT = 3000, NODE_ENV, DB_CONN, DB_DEV_CONN = 'mongodb://localhost:27017/news-explorer-db',
} = process.env;

const app = express();
async function start() {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? DB_CONN : DB_DEV_CONN, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`App successfully started on port ${PORT}, timestamp: ${new Date().toUTCString()}`);
    });
  } catch (err) {
    console.error(err);
  }
}
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use('/', error);
start();
