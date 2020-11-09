const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET, JWT_DEV_SECRET = 'save-dev-and-enter' } = process.env;

module.exports = (req, res, next) => {
  // const cookie = req.cookies.jwt;
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthError('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET);
    req.user = payload;

    next();
    // else if (!authorization && cookie) {
    //   payload = jwt.verify(cookie,
    //     NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET);
    //   req.user = payload;

    //   next();
    // }
  } catch (e) {
    next(new AuthError('Необходима авторизация'));
  }
};
