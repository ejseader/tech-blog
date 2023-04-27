const router = require('express').Router();

const userRoutes = require('./routes');
const homeRoutes = require('./home_routes.js');

router.use('/', [homeRoutes, userRoutes]);

module.exports = router;