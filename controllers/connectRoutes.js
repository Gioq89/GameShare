const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User } = require('../models');
const shuffle = require('shuffle-array');

// --------------------------------------------------------------
// GET the connect page for the website
router.get('/', withAuth, async (req, res) => {
  try {
    const usersData = await User.findAll({
      attributes: ['id', 'username', 'interestedGenre', 'preferredPlatform'],
    });

    const user_data = usersData.map((user) => user.get({ plain: true }));

    const random_users = shuffle(user_data);

    // show 5 random users
    const users = random_users.slice(0, 5);

    // render the connect page to see other users
    res.render('connect', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET the results from a search (either by platform or category)
router.get('/search/:search', withAuth, async (req, res) => {
  try {
    const search = req.params.search;
    const results = req.query.results;

    // need to revert the results query that was encoded back to a normal JSON string file
    const users = JSON.parse(decodeURIComponent(results));
    const number_of_users = users.length;

    if (number_of_users == 0) {
      alert(
        'No gamers found with the same interest/platform! Please select again.',
      );
    } else {
      res.render('user-search-results', {
        users,
        search,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
