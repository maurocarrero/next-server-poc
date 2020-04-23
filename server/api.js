const { findDocuments } = require('./db');

function api(server) {
  server.get('/movies', (req, res) => {
    try {
      const db = server.locals.db;
      findDocuments(db, (data) => {
        if (data) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(data));
        } else {
          res.sendStatus(404);
        }
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });
}

module.exports = { api };
