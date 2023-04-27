const router = require('express').Router();
const User = require('../../models/User');

function isLoggedIn(req, res, next) {
  if (req.session.userId) return res.redirect('/dashboard');

  next();
}

// CREATE new user
router.post('/register', async (req, res) => {
  const user = req.body;

  try {
    const userData = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    req.session.userId = userData.id;

    return res.redirect('/dashboard');

  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
});

// Login
router.post('/login', isLoggedIn, async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!user) {
      return res.redirect('/register')
    }

    const validPassword = await userData.checkPassword(userData.password);

    if (!validPassword) {
      return res.redirect('/login')
    }

    req.session.userId = user.id;

    res.redirect('/dashboard');
    } catch (err) {
      console.log(err);
      res.redirect('/login');
    }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
