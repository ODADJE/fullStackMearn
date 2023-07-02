const articleService = require("../services/articles.services");

const addArticle = (req, res) => {
  articleService.add(req, res);
};

const getArticle = (req, res) => {
  articleService.allArticle(req, res);
};

const getOneArticle = (req, res) => {
  articleService.oneArticle(req, res);
};

const deleteArticle = (req, res) => {
  articleService.del(req, res);
};
const updateArticle = (req, res) => {
  articleService.update(req, res);
};

module.exports = {
  addArticle,
  getArticle,
  getOneArticle,
  deleteArticle,
  updateArticle,
};
