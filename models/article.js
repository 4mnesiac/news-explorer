const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  text: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  source: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  link: {
    type: mongoose.Schema.Types.String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url, {
        allow_underscores: true, allow_trailing_dot: true, allow_protocol_relative_urls: true,
      }),
    },
  },
  image: {
    type: mongoose.Schema.Types.String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url, {
        allow_underscores: true, allow_trailing_dot: true, allow_protocol_relative_urls: true,
      }),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
