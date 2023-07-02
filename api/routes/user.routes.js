const route = require("express").Router();
const user = require("../controllers/user.controllers");
const auth = require("../middlewares/auth");
route
  .post("/", user.addUser)
  .post("/login", user.loginUser)
  .get("/", auth, user.getAllUser)
  .get("/:id", auth, user.getOneUser)
  .delete("/:id", auth, user.deleteUser)
  .put("/:id", auth, user.updateUser);

module.exports = route;
