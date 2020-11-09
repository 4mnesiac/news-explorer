const router = require('express').Router();
const path = require('path');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUser,
  login,
  createUser,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.join(__dirname, '..', 'controllers', 'users'));

router.get('/users/me', auth, getUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), createUser);

module.exports = router;
