const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserBody } = require('../middlewares/validate');
const NotFoundError = require('../errors/NotFoundError');

// TODO: exclude after review
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signup', validateUserBody, usersController.createUser);
router.use('/signin', validateUserBody, usersController.login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
