const router = require('express').Router();
const { Post, Comment, User } = require('../models');

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

// GET all posts for homepage
router.get('/', async (req, res) => {
    const allPosts = await Post.findAll()
    res.render('index', {posts: allPosts})
});

// GET user's posts for dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findOne({
      where: {
        id: req.session.user_id
      },
      include: Post,
      attributes: {
        exclude: ['password']
      }
    });
    console.log('triggered');
    res.render('private/dashboard', {
      user,
      loggedIn: true
    });
  });

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: Comment
    });

    const post = postData.get({ plain: true });
    res.render('private/post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one comment
router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);

    const comment = commentData.get({ plain: true });
    res.render('comment', { comment, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  console.log(req.session.user_id);
  if (req.session.user_id) {
    res.redirect('/dashboard');
    return;
  }
  res.render('auth/login');
});

// Register route
router.get('/register', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard');
    return;
  }
  res.render('auth/register');
});

module.exports = router;
