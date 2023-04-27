const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
}

// GET user's posts for dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
  const userPosts = await Post.findAll({
    where: {
      id: req.session.userId
    },
    include: User,
    attributes: {
      exclude: ['password']
    }
  });
    res.render('/private/dashboard', {
      userposts: userPosts,
      loggedIn: true,
      isDashboard: true
    });
  });

// User must be logged in to access newpost page
router.get('/newpost', isAuthenticated, async (req, res) => {

  res.render('private/newpost', {
    loggedIn: true
  });
});

// CREATE new post
router.post('/newpost', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.userId);

  req.user = user;

  upload(req, res, (err) => {
    if (err) return console.log(err);

    res.redirect('/dashboard');
  });
});

// EDIT new post
router.put('/posts/:id')



module.exports = router;