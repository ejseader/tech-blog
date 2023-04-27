const router = require('express').Router();

const authRoutes = require('./auth_routes');
const privateRoutes = require('./private_routes');

router.use('/auth', authRoutes);
router.use('/', privateRoutes);

module.exports = router;