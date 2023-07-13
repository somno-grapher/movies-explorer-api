const router = require('express').Router();

const usersController = require('../controllers/users');
const {
  validateUserBodyOnProfileUpdate,
} = require('../middlewares/validate');

router.get('/me', usersController.getCurrentUserDecorator(usersController.getUser));

router.patch('/me', validateUserBodyOnProfileUpdate, usersController.updateProfileDecorator(usersController.updateUserInfo));

module.exports = router;
