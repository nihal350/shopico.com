const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  const token = req.session.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.redirect('/login');
    }
  } else {
    return res.redirect('/login');
  }
};

module.exports = isAuthenticated;
