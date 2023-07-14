const router = require('express').Router();
const { Game, User, Friend, UserGames, UserFriends } = require('../models');
const withAuth = require('../utils/auth');

// ---------------------------------------------------------------
// GET all games/user information that are stored for the user
router.get('/:username', async (req, res) => {
  try {
    const profileData = await User.findOne({
      where: {
        username: req.params.username,
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

    // render the homepage and pass that the user is logged in
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

// ---------------------------------------------------------------

module.exports = router;
