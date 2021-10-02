'use strict';

const {HttpStatusCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    return res.status(HttpStatusCode.NOT_FOUND).send(`Article with id "${articleId}" not found!`);
  }

  res.locals.article = article;
  return next();
};
