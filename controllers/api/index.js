const router = require('express').Router();

const gameRoutes = require('./gameRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/games', gameRoutes);
router.use('/users', userRoutes);
router.use('/login', loginRoutes);

module.exports = router;
