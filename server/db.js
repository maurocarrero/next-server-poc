const getConfig = require('next/config').default;
const MongoClient = require('mongodb').MongoClient;

function connect(cb) {
  const {
    serverRuntimeConfig: {
      DB_AUTH_SOURCE,
      DB_CLUSTER,
      DB_NAME,
      DB_PASS,
      DB_PATH,
      DB_READ_PREFERENCE,
      DB_REPLICA_SET,
      DB_TLS,
      DB_USE_UNIFIED_TOPOLOGY,
      DB_USER
    } = {}
  } = getConfig() || {};

  const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/${DB_PATH}`;

  const client = new MongoClient(DB_URL, {
    authSource: DB_AUTH_SOURCE,
    readPreference: DB_READ_PREFERENCE,
    replicaSet: DB_REPLICA_SET,
    tls: DB_TLS === 'true',
    useUnifiedTopology: DB_USE_UNIFIED_TOPOLOGY === 'true'
  });

  client.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log('Connected successfully to MongoDB server.');
    cb(client.db(DB_NAME));
  });
}

function findDocuments(db, cb) {
  const { serverRuntimeConfig: { DB_COLLECTION_NAME } = {} } =
    getConfig() || {};
  const collection = db.collection(DB_COLLECTION_NAME);
  collection
    .find({})
    .project({ _id: 0, title: 1, plot: 1 })
    .toArray(function (err, docs) {
      if (err) throw err;
      cb(docs);
    });
}

module.exports = { connect, findDocuments };
