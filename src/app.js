'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./auth-router');
const errorHandler = require('./middleware/500');
const notFound = require('./middleware/404');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

app.use('/docs', express.static('docs'));

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is up on ${port}`);
    });
  },
};
