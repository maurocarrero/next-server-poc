const express = require('express');
const next = require('next');
const getDbAdapter = require('./db');
// const { api } = require('./api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // api(server);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  getDbAdapter().connect(() => {
    server.listen(port, (err) => {
      if (err) {
        console.log('ERR', err.message);
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});
