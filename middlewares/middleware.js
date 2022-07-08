const { convertToPayload } = require("../helpers/jwt");
const { User, Product } = require("../models");

const authenticationMiddleware = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const payload = convertToPayload(access_token);
    // console.log(payload,"<<<<<<<<<<<<<<<<<<payload")

    const user = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });

    if (!user) {
      throw { name: "User_not_found" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authorizationMiddleware = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw { name: "notfound" };
    }

    const user = await User.findByPk(userId);

    if (user.role === "Admin" || product.userId === userId) {
      next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticationMiddleware, authorizationMiddleware };
