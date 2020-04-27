const getConfig = require('next/config').default;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class DBAdapter {
  constructor() {
    this.date = new Date();
    this.__db = null;
    this.connect = this.connect.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.getDb = this.getDb.bind(this);
  }

  connect(cb) {
    const {
      serverRuntimeConfig: {
        DB_AUTH_SOURCE,
        DB_HOME,
        DB_SCHEME,
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

    const USER_CREDENTIALS = DB_USER && DB_PASS ? `${DB_USER}:${DB_PASS}@` : '';
    const PATH = DB_PATH ? '/' + DB_PATH : '';
    const DB_URL = `${DB_SCHEME}://${USER_CREDENTIALS}${DB_HOME}${PATH}`;

    const clientConfiguration = {
      ...(DB_AUTH_SOURCE ? { authSource: DB_AUTH_SOURCE } : {}),
      ...(DB_READ_PREFERENCE ? { readPreference: DB_READ_PREFERENCE } : {}),
      ...(DB_REPLICA_SET ? { replicaSet: DB_REPLICA_SET } : {}),
      ...(DB_TLS ? { tls: DB_TLS === 'true' } : {}),
      ...(DB_USE_UNIFIED_TOPOLOGY
        ? { useUnifiedTopology: DB_USE_UNIFIED_TOPOLOGY === 'true' }
        : {})
    };

    const client = new MongoClient(DB_URL, clientConfiguration);

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

  findAll(cb) {
    if (!this.__db) {
      console.error('NO DATABASE SET');

      return null;
    }
    const { serverRuntimeConfig: { DB_COLLECTION_NAME } = {} } =
      getConfig() || {};
    const collection = this.__db && this.__db.collection(DB_COLLECTION_NAME);
    collection
      ? collection
          .find({})
          .project({ title: 1, plot: 1 })
          .toArray(function (err, docs) {
            if (err) throw err;
            cb(docs);
          })
      : {};
  }

  findAllIds(cb) {
    return this.findAll((docs) => {
      cb(
        docs.map((el) => {
          return el._id;
        })
      );
    });
  }

  findOne(_id, cb) {
    if (!this.__db) {
      console.error('NO DATABASE SET');
      return null;
    }
    const { serverRuntimeConfig: { DB_COLLECTION_NAME } = {} } =
      getConfig() || {};
    const collection = this.__db && this.__db.collection(DB_COLLECTION_NAME);
    collection
      ? collection.findOne({ _id: ObjectId(_id) }, (err, doc) => {
          if (err) throw err;
          cb(doc);
        })
      : {};
  }
}

module.exports = new DBAdapter();
