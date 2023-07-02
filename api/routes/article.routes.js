const route = require("express").Router();
const article = require("../controllers/article.controllers");
const auth = require("../middlewares/auth");
route
  .post("/", auth, article.addArticle)
  .get("/", auth, article.getArticle)
  .get("/:id", auth, article.getOneArticle)
  .delete("/:id", auth, article.deleteArticle)
  .put("/:id", auth, article.updateArticle);

module.exports = route;
