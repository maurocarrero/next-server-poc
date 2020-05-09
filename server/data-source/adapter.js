const MongoClient = require('mongodb').MongoClient;
const getConfig = require('next/config').default;

const moviesDAO = require('./dao/movies.dao');

class DBAdapter {
  constructor({ moviesDAO }) {
    this.__moviesDAO = moviesDAO;
  }

  __setConfig() {
    const {
      serverRuntimeConfig: {
        DB_AUTH_SOURCE,
        DB_HOME,
        DB_SCHEME,
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

    this.__dbURI = `${DB_SCHEME}://${USER_CREDENTIALS}${DB_HOME}${PATH}`;

    this.__clientConfiguration = {
      ...(DB_AUTH_SOURCE ? { authSource: DB_AUTH_SOURCE } : {}),
      ...(DB_READ_PREFERENCE ? { readPreference: DB_READ_PREFERENCE } : {}),
      ...(DB_REPLICA_SET ? { replicaSet: DB_REPLICA_SET } : {}),
      ...(DB_TLS ? { tls: DB_TLS === 'true' } : {}),
      ...(DB_USE_UNIFIED_TOPOLOGY
        ? { useUnifiedTopology: DB_USE_UNIFIED_TOPOLOGY === 'true' }
        : {})
    };
  }

  async connect() {
    try {
      this.__setConfig();
      this.__client = await MongoClient.connect(
        this.__dbURI,
        this.__clientConfiguration
      );
      await this.__moviesDAO.injectDB(this.__client);
      console.log('DBAdapter :: connected successfully to MongoDB server.');
    } catch (e) {
      console.error(
        'DBAdapter :: connection with MongoDB server could not be established.',
        e.message
      );
      throw e;
    }
  }

  async getMovies() {
    this.__validateDAO();
    return this.__moviesDAO.getMovies();
  }

  async getMovieByID(id) {
    this.__validateDAO();
    return this.__moviesDAO.getMovieByID(id);
  }

  __validateDAO() {
    if (!this.__moviesDAO) {
      throw Error('Movies DAO is not properly set.');
    }
  }
}

module.exports = new DBAdapter({
  moviesDAO
});
