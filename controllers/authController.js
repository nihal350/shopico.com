const User = require('../model/User');

exports.getLoginPage = (req, res) => {
  return res.render('login', { error: undefined });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await user.validatePassword(password);

      if (passwordMatch) {
        const token = user.generateAuthToken();
        req.session.token = token;
        return res.redirect('/');
      } else {
        return res.render('login', { error: 'Invalid email or password' });
      }
    } else {
      return res.render('login', { error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    return res.render('login', { error: 'An error occurred. Please try again later.' });
  }
};

exports.logout = (req, res) => {
  req.session.token = null;
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    }
    return res.redirect('/login');
  });
};

exports.getRegisterPage = (req, res) => {
  return res.render('register', { error: undefined });
};

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('register', { error: 'Passwords do not match' });
  }
  try {
    const user = new User({ username, email, password });
    await user.save();
    req.user = user;
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.render('register', { error: 'An error occurred. Please try again later.' });
  }
};

exports.getForgetPasswordPage = (req, res) => {
  return res.render('forget', { error: undefined });
};

exports.changePassword = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    return res.render('forget', { error: 'Passwords do not match' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('forget', { error: 'User not found' });
    }
    const hashedPassword = await user.validatePassword(password);

    user.password = hashedPassword;
    await user.save();

    return res.redirect('/login');
  } catch (err) {
    console.error(err);
    return res.render('forget', { error: 'An error occurred. Please try again later.' });
  }
};

exports.redirectToAdminLoginPage = (req, res) => {
  return res.redirect('/admin/login');
};

exports.getAdminLoginPage = (req, res) => {
  return res.render('admin-login', { error: undefined });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, isAdmin: true });
    if (user) {
      const passwordMatch = await user.validatePassword(password);
      if (passwordMatch) {
        const token = user.generateAuthToken();
        req.session.token = token;
        return res.redirect('/admin/product');
      }
    } else {
      return res.render('admin-login', { error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    return res.render('admin-login', { error: 'An error occurred. Please try again later.' });
  }
};

exports.adminLogout = (req, res) => {
  req.session.token = null;
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    }
    return res.redirect('/admin');
  });
};
