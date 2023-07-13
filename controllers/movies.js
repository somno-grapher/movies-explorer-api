const mongoose = require('mongoose');

const movieModel = require('../models/movie');
const STATUS_CODES = require('../utils/consts');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// const getMovies = (req, res, next) => {
//   movieModel.find({})
//     .then((movies) => {
//       res.send(movies);
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const getMovies = (req, res, next) => {
  movieModel.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  movieModel.create({
    owner: req.user._id,
    ...req.body,
  })

    .then((movie) => {
      res.status(STATUS_CODES.CREATED).send(movie);
    })

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(`Переданы некорректные данные. ${err.message}`));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieModel.findById(req.params.movieId)

    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
      return movie.deleteOne();
    })

    .then(() => {
      res.send({ message: 'Фильм удален' });
    })

    .catch((err) => {
      next(err);
    });
};

// const updateLike = (isToBeLiked, req, res, next) => {
//   const likeParameters = { likes: req.user._id };
//   const update = isToBeLiked
//     ? { $addToSet: likeParameters }
//     : { $pull: likeParameters };

//   movieModel.findByIdAndUpdate(
//     req.params.movieId,
//     update,
//     { new: true },
//   )

//     .then((movie) => {
//       if (!movie) {
//         throw new NotFoundError('Карточка не найдена');
//       }
//       return res.send(movie);
//     })

//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         next(new BadRequestError('Переданы некорректные данные'));
//         return;
//       }
//       next(err);
//     });
// };

// updateLike decorator
// const likeMovieDecorator = (update) => (req, res, next) => {
//   update(true, req, res, next);
// };

// updateLike decorator
// const unlikeMovieDecorator = (update) => (req, res, next) => {
//   update(false, req, res, next);
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  // updateLike,
  // likeMovieDecorator,
  // unlikeMovieDecorator,
};
