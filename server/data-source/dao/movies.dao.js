const getConfig = require('next/config').default;
const ObjectId = require('mongodb').ObjectID;

class MoviesDAO {
  async injectDB(client) {
    if (this._moviesCollection) {
      return;
    }
    try {
      const { serverRuntimeConfig: { DB_NAME, DB_COLLECTION_NAME } = {} } =
        getConfig() || {};
      if (DB_NAME && DB_COLLECTION_NAME) {
        this._db = await client.db(DB_NAME);
        this._moviesCollection = await this._db.collection(DB_COLLECTION_NAME);
      } else {
        throw Error('DB_NAME && DB_COLLECTION_NAME are not defined.');
      }
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in moviesDAO: ${e}`
      );
      throw e;
    }
  }

  async getMovies() {
    let cursor;

    const query = {};
    const project = { title: 1, plot: 1 };
    const sort = {};

    try {
      cursor = await this._moviesCollection
        .find(query)
        .project(project)
        .sort(sort);
      cursor.limit(20);
      return {
        moviesList: await cursor.toArray(),
        totalNumMovies: await this._moviesCollection.countDocuments(query)
      };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return {
        moviesList: [],
        totalNumMovies: 0
      };
    }
  }

  async getMovieByID(id) {
    try {
      if (!id) {
        throw Error('No ID provided.');
      }

      const query = {
        _id: ObjectId(id)
      };

      return await this._moviesCollection.findOne(query);
    } catch (e) {
      console.error(`Unable to issue findOne command, ${e}`);
      return [];
    }
  }

  __validate() {
    if (!this._db) {
      throw Error('DB is not properly set.');
    }
    if (!this._moviesCollection) {
      throw Error(`Movies collection is not properly set.`);
    }
  }
}

module.exports = new MoviesDAO();
