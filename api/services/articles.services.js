const Article = require("../models/article.model");
const slugify = require("slugify");
const add = async (req, res) => {
  try {
    const data = { ...req.body, ...{ slug: slugify(req.body.title) } };
    const article = new Article(data);
    await article.save();
    res.status(200).json({ message: "Article added", data: article });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Verify information", error: error.message });
  }
};

const allArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({ message: "List of article", data: articles });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const oneArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findOne({ _id: id });
    res.status(200).json({ message: "article finded", data: article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.deleteOne({ _id: id });
    if (article.deletedCount) {
      res.status(200).json({ message: "Article deleted" });
    } else {
      throw new Error("Article doesn't exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const update = async (req, res) => {
  try {
    let data = req.body;
    if (data.title) {
      data = { ...req.body, ...{ slug: slugify(req.body.title) } };
    }
    const { id } = req.params;
    const article = await Article.findOneAndUpdate({ _id: id }, { ...data });
    if (article) {
      res.status(200).json({ message: "Article updated" });
    } else {
      throw new Error("Can't find article to update");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  add,
  allArticle,
  oneArticle,
  del,
  update,
};
