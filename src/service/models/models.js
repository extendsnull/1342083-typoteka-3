'use strict';

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const defineArticle = require(`./article`);
const defineComment = require(`./comment`);
const {
  ModelAliase,
  CommentKey,
  ArticleKey,
} = require(`../../constants`);

class ArticleCategory extends Model {}

module.exports = (sequelize) => {
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);
  const Article = defineArticle(sequelize);
  const Comment = defineComment(sequelize);

  ArticleCategory.init({}, {sequelize});

  Article.hasMany(Comment, {
    as: ModelAliase.COMMENTS,
    foreignKey: CommentKey.ARTICLE_ID,
    onDelete: `cascade`,
  });
  Comment.belongsTo(Article, {
    foreignKey: CommentKey.ARTICLE_ID,
  });

  Article.belongsTo(User, {
    as: ModelAliase.USERS,
    foreignKey: ArticleKey.USER_ID,
    onDelete: `cascade`,
  });
  Comment.belongsTo(User, {
    foreignKey: CommentKey.USER_ID,
  });

  Article.belongsToMany(Category, {
    as: ModelAliase.CATEGORIES,
    through: ArticleCategory,
  });
  Category.belongsToMany(Article, {
    as: ModelAliase.ARTICLES,
    through: ArticleCategory,
  });

  Category.hasMany(ArticleCategory, {
    as: ModelAliase.ARTICLES_CATEGORIES,
  });

  return {
    Category,
    User,
    Article,
    Comment,
    ArticleCategory,
  };
};
