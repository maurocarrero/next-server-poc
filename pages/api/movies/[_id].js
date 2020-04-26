export default (req, res) => {
  // TODO: Why we need this promise??
  // https://github.com/zeit/next.js/issues/10439
  return new Promise((resolve, reject) => {
    const {
      query: { _id }
    } = req;
    try {
      res.locals.db.findOne(_id, (data) => {
        if (data) {
          setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data);
            resolve();
          }, 1000);
        } else {
          res.sendStatus(404);
          resolve();
        }
      });
    } catch (err) {
      console.log('err', err.message);
      res.sendStatus(500);
      reject();
    }
  });
};
