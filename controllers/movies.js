const mongoose = require('mongoose');

const movieModel = require('../models/movie');
const STATUS_CODES = require('../utils/consts');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

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

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
