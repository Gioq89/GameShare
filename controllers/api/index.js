const router = require('express').Router();
const gameRoutes = require('./gameRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/games', gameRoutes);
router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;
