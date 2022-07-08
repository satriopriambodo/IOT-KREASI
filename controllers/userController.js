const { User } = require("../models");
const bcrypt = require("bcrypt");
const { token } = require("../helpers/jwt");

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const response = await User.create({
      name,
      email,
      password: password,
      role: "Admin",
    });
    res.status(201).json({
      id: response.id,
      email: response.email,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { name: "Bad Request" };
    }

    const response = await User.findOne({ where: { email } });
    if (!response) {
      throw { name: "Unauthorized" };
    }

    const isValid = bcrypt.compareSync(password, response.password);
    if (!isValid) {
      throw { name: "Unauthorized" };
    }

    const payload = {
      id: response.id,
      email: response.email,
    };
    const role = response.role;
    const userEmail = response.email;
    res.status(200).json({
      access_token: token(payload),
      userRole: role,
      userEmail: userEmail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { register, login };
