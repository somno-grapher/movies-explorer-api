const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { validateMovieIdParam, validateMovieBody } = require('../middlewares/validate');

router.get('/', moviesController.getMovies);
router.post('/', validateMovieBody, moviesController.createMovie);
router.delete('/:movieId', validateMovieIdParam, moviesController.deleteMovie);
// router.put(
//   '/:movieId/likes',
//   validateMovieIdParam,
//   moviesController.likeMovieDecorator(moviesController.updateLike)
// );
// router.delete(
//   '/:movieId/likes',
//   validateMovieIdParam,
//   moviesController.unlikeMovieDecorator(moviesController.updateLike)
// );

module.exports = router;
