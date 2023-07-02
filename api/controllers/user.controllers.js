const userService = require("../services/user.services");

const addUser = (req, res) => {
  userService.add(req, res);
};
const getAllUser = (req, res) => {
  userService.allUser(req, res);
};

const getOneUser = (req, res) => {
  userService.oneUser(req, res);
};

const deleteUser = async (req, res) => {
  userService.del(req, res);
};

const updateUser = (req, res) => {
  userService.update(req, res);
};

const loginUser = (req, res) => {
  userService.loginUser(req, res);
};

module.exports = {
  addUser,
  getAllUser,
  getOneUser,
  deleteUser,
  updateUser,
  loginUser,
};
