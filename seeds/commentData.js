const { Comment } = require('../models');

const commentData = [
  {
    content: 'Great piece! I completely agree!',
    user_id: 3,
    post_id: 1
  },
  {
    content: 'You said it, brother!',
    user_id: 2,
    post_id: 2
  },
  {
    content: 'That guy Nathan sounds like a cool dude.',
    user_id: 1,
    post_id: 3
  }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;