const { Router } = require('express');
const MoviesCtrl = require('./movies.controller');

const router = new Router();

router.route('/').get(MoviesCtrl.apiGetMovies);
router.route('/:id').get(MoviesCtrl.apiGetMovieByID);

module.exports = router;
