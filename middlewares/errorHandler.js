const errorHandler = (err, req, res, next) => {
  let errCode = 500;
  let msg = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    (errCode = 400), (msg = err.errors.map((el) => el.message));
  } else if (err.name === "notValid") {
    (errCode = 401), (msg = "username/password is not found");
  } else if (err.name === "JsonWebTokenError") {
    (errCode = 401), (msg = "Invalid Signature");
  } else if (err.name === "forbidden") {
    (errCode = 403), (msg = "Forbidden to access");
  } else if (err.name === "notfound") {
    (errCode = 404), (msg = "Data is not found");
  } else if (err.name == "Bad Request") {
    (errCode = 400), (msg = "Bad Request");
  } else if (err.name == "Unauthorized") {
    (errCode = 401), (msg = "Wrong email/password");
  } else if (err.name == "User_not_found") {
    (errCode = 401), (msg = "Unauthorized");
  }

  res.status(errCode).json({
    errCode: errCode,
    message: msg,
  });
};

module.exports = errorHandler;
