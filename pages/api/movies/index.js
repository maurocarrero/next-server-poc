export default (req, res) => {
  // TODO: Why we need this promise??
  // https://github.com/zeit/next.js/issues/10439
  return new Promise((resolve, reject) => {
    try {
      res.locals.db.findAll((data) => {
        if (data) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(data));
        } else {
          res.sendStatus(404);
        }
        resolve();
      });
    } catch (err) {
      res.sendStatus(500);
      reject();
    }
  });
};
