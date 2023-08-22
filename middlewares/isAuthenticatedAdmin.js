const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const isAuthenticatedAdmin = (req, res, next) => {
  const token = req.session.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (decoded.isAdmin) {
        req.user = decoded;
        return next();
      } else {
        return res.redirect('/admin');
      }
    } catch (err) {
      return res.redirect('/admin');
    }
  } else {
    return res.redirect('/admin');
  }
};

module.exports = isAuthenticatedAdmin;
