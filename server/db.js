const getConfig = require('next/config').default;
const MongoClient = require('mongodb').MongoClient;

class DBAdapter {
  constructor() {
    this.date = new Date();
    this.__db = null;
    this.connect = this.connect.bind(this);
    this.findDocuments = this.findDocuments.bind(this);
    this.getDb = this.getDb.bind(this);
  }

  connect(cb) {
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

    client.connect((err) => {
      if (err) {
        throw err;
      }
      console.log('Connected successfully to MongoDB server.');
      this.__db = client.db(DB_NAME);
      cb(this.__db);
    });
  }

  getDb() {
    return this.__db;
  }

  findDocuments(cb) {
    if (!this.__db) {
      console.error('NO DATABASE SET');

      return null;
    }
    console.log('findDocuments :: this.__db', this.__db);
    const { serverRuntimeConfig: { DB_COLLECTION_NAME } = {} } =
      getConfig() || {};
    const collection = this.__db && this.__db.collection(DB_COLLECTION_NAME);
    collection
      ? collection
          .find({})
          .project({ _id: 0, title: 1, plot: 1 })
          .toArray(function (err, docs) {
            if (err) throw err;
            cb(docs);
          })
      : {};
  }
}

let db = null;

const getDbAdapter = () => {
  if (!db) {
    console.log('NO EXISTE, lo creo');
    db = new DBAdapter();
  }
  return db;
};

module.exports = getDbAdapter;
