const getDbAdapter = require('../../server/db');

export default (req, res) => {
  try {
    getDbAdapter().findDocuments((data) => {
      if (data) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(data));
      } else {
        res.sendStatus(404);
      }
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
