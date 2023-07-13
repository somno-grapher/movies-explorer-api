const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { validateMovieIdParam, validateMovieBody } = require('../middlewares/validate');

router.get('/', moviesController.getMovies);
router.post('/', validateMovieBody, moviesController.createMovie);
router.delete('/:movieId', validateMovieIdParam, moviesController.deleteMovie);

module.exports = router;
