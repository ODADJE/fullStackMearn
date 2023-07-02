const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const add = async (req, res) => {
  try {
    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 8 characters" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const data = { ...req.body, ...{ password: hash } };
    const user = new User(data);
    await user.save();
    res.status(200).json({ message: "User added", data: user });
  } catch (error) {
    res.status(400).json({ message: "Can't add user", error: error.message });
  }
};

const allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users' list", data: users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Can't fetch users' list...", error: error.message });
  }
};

const oneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json({ message: "User found", data: user });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id });
    if (user.deletedCount) {
      res.status(200).json({ message: "User deleted" });
    } else {
      throw new Error("User doesn't exist");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const update = async (req, res) => {
  try {
    let data = req.body;
    if (data.password && data.password.length < 8) {
      const hash = await bcrypt.hash(req.body.password, 10);
      data = { ...req.body, ...{ password: hash } };
    }
    const { id } = req.params;
    const user = await User.findOneAndUpdate({ _id: id }, { ...data });
    if (user) {
      res.status(200).json({ message: "User updated" });
    } else {
      throw new Error("Can't find user to update");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = (req, res) => {
  const data = req.body;
  User.findOne({ username: data.username }).then((response) => {
    if (response) {
      bcrypt
        .compare(data.password, response.password)
        .then((isValidPassword) => {
          if (isValidPassword) {
            const token = jwt.sign(data, process.env.TOKEN_KEY, {
              expiresIn: "2h",
            });

            const msg = "user connected";
            return res.json({ msg, token: token });
          } else {
            const msg = "connection failed";
            return res.status(400).json({ msg });
          }
        });
    } else {
      const msg = "connection failed";
      return res.status(400).json({ msg });
    }
  });
};

module.exports = {
  add,
  allUser,
  oneUser,
  del,
  update,
  loginUser,
};
