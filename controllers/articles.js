const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.status(200).send(
      { article },
    ))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send({
      message: 'Новость успешно создана',
      data: article,
    }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статьи с указанным id не существует');
      } else if (article && article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Article.findByIdAndRemove(req.params._id)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        })
    })
    .catch(next);
};
