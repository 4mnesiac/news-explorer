const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const auth = require('../middlewares/auth');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/articles', auth, getArticles);

router.post('/articles', auth, celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('string is not URL');
      }
      return value;
    }, 'URL validation'),
    image: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new Error('string is not URL');
      }
      return value;
    }, 'URL validation'),
  }),
}), createArticle);

router.delete('/articles/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error('Invalid article id');
      }
      return value;
    }, 'ObjectId validation'),
  }),
}), deleteArticle);

module.exports = router;
