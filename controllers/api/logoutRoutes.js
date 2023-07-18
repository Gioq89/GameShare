const router = require('express').Router();
// Logout
router.post('/', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
