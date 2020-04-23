const express = require('express');
const next = require('next');
const { connect } = require('./db');
const { api } = require('./api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  api(server);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  connect((db) => {
    server.locals.db = db;
    server.listen(port, (err) => {
      if (err) {
        console.log('ERR', err.message);
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});
