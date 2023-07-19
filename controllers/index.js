const router = require('express').Router();
const withAuth = require('../utils/auth');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const profileRoutes = require('./profileRoutes');
const connectRoutes = require('./connectRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/connect', connectRoutes);

module.exports = router;
