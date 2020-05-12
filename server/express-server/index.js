const getConfig = require('next/config').default;
const express = require('express');
const morgan = require('morgan');

const moviesRouter = require('./movies.router');

const bootServer = async () => {
  try {
    const server = express();
    const { NODE_ENV } = getConfig().publicRuntimeConfig;

    if (NODE_ENV !== 'production') {
      server.use(morgan('dev'));
    }

    server.use('/api/movies', moviesRouter);

    return server;
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};

module.exports = bootServer;
