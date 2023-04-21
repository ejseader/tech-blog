const router = require('express').Router();
const { Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
    const allPosts = await Post.findAll()
    res.render('index', {posts: allPosts})
});

// GET user's posts for dashboard
router.get('/dashboard', async (req, res) => {
  const postData = await Post.findAll({
      where: {
        user_id: req.session.id
      },
    });
    res.render('private/dashboard', {
      postData,
      loggedIn: req.session.loggedIn,
    });
  });

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
    });

    const post = postData.get({ plain: true });
    res.render('/private/post', { post, loggedIn: req.session.loggedIn });
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
  if (req.session.loggedIn) {
    res.redirect('private/dashboard');
    return;
  }
  res.render('auth/login');
});

module.exports = router;
