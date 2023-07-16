const router = require('express').Router();
const { Game, User, Friend, UserGames, UserFriends } = require('../models');
const withAuth = require('../utils/auth');

// ---------------------------------------------------------------
// GET all games/user information that are stored for the user
router.get('/', async (req, res) => {
  try {
    const profileData = await User.findOne({
      where: {
        username: 'user1',
        // username: req.session.username,
      },
      attributes: { exclude: "password" },
      include: [
        {
          model: Game,
          as: "user_games",
          through: UserGames,
        },
        {
          model: Friend,
          as: "user_friends",
          through: UserFriends,
        },
      ],
    });

    const profile = profileData.get({ plain: true });
    const games = profile.user_games;
    const friends = profile.user_friends;

    // render the profile of the user
    res.render('profile', {
      ...profile,
      games,
      friends,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all games/user information that are stored for any user
router.get('/:username', async (req, res) => {
  try {
    const profileData = await User.findOne({
      where: {
        username: req.params.username
      },
      attributes: { exclude: "password" },
      include: [
        {
          model: Game,
          as: "user_games",
          through: UserGames,
        },
        {
          model: Friend,
          as: "user_friends",
          through: UserFriends,
        },
      ],
    });

    const profile = profileData.get({ plain: true });
    const games = profile.user_games;
    const friends = profile.user_friends;

    const userData = await User.findOne({
      where: {
        // username: req.session.username
        username: 'user1'
        },
      attributes: ['username']
      });
      const user = userData.get({ plain: true });

    // render a profile of other users
    res.render('other-user-profile', {
      ...profile,
      games,
      friends,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ---------------------------------------------------------------

module.exports = router;
