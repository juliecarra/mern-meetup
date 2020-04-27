//Check if user is logged in (with passport method)
exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) next();
  else
    return res
      .status(403)
      .json({ message: "You need to be logged in to see this page." });
};
