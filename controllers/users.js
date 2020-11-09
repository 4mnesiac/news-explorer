const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AuthError = require('../errors/auth-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET, JWT_DEV_SECRET = 'save-dev-and-enter' } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new BadRequestError('Не указан email или пароль');
    } else {
      User.findUserByCredentials(email, password)
        .then((user) => {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET,
            { expiresIn: '7d' },
          );
          res
            // .cookie('jwt', token, {
            //   maxAge: 3600 * 1000 * 24 * 7,
            //   httpOnly: true,
            //   sameSite: true,
            // })
            .status(200)
            .send({ jwt: token });
        }).catch(() => {
          next(new AuthError('Ошибка авторизации'));
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  if (!password || password.length < 8) {
    throw new BadRequestError('Пароль должен состоять из латинских букв и цифр, длиной от 8 до 30 символов');
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        email,
        password: hash,
      }))
      .then(() => res.status(201).send({
        data: {
          name,
          email,
        },
      }))
      .catch((err) => {
        if (err.errors.email && err.errors.email.kind === 'unique') {
          next(new ConflictError('Пользователь с таким email уже существует'));
        } else {
          next(err);
        }
      });
  }
};
