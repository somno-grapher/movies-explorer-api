const {
  celebrate,
  Joi,
} = require('celebrate');

const { validateURL } = require('../utils/urlValidator');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateUserBodyOnProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// const validateUserBodyOnAvatarUpdate = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().custom(validateURL),
//   }),
// });

// const validateUserIdParam = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().hex().length(24),
//   }),
// });

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailerLink: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieIdParam = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUserBody,
  validateUserBodyOnProfileUpdate,
  // validateUserBodyOnAvatarUpdate,
  // validateUserIdParam,
  validateMovieBody,
  validateMovieIdParam,
};
