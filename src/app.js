'use strict';

const express = require('express');
const initConfig = require('./config');

// App-level middleware libraries
const cors = require('cors');
const morgan = require('morgan');

// Custom middleware
const errorHandler = require('./middleware/500');
const notFound = require('./middleware/404');

// Routes
const authRoutes = require('./route/auth-router');
const apiRoutes = require('./route/api-router');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use(apiRoutes);

app.use('/docs', express.static('docs'));

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  config: initConfig,
  start: (port) => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is up on ${PORT}`);
    });
  },
};
