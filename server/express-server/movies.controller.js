const ds = require('../data-source');

class MoviesCtrl {
  static async apiGetMovies(_, res) {
    const { moviesList } = await ds.getMovies();
    res.status(200).json(moviesList);
  }

  static async apiGetMovieByID(req, res) {
    const {
      params: { id }
    } = req;
    const movieData = await ds.getMovieByID(id);
    res.status(200).json(movieData);
  }
}

module.exports = MoviesCtrl;
