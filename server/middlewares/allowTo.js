const AppError = require("../utils/AppError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      console.log("this role not authorized");
      return next(AppError.create("this role not authorized", 401));
    }
    next();
  };
};
