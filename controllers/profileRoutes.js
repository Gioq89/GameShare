const router = require('express').Router();
const { Game, User, Friend, UserGames, UserFriends } = require('../models');
const withAuth = require('../utils/auth');
// ---------------------------------------------------------------
// GET all games/user information that are stored for the user
router.get('/', withAuth, async (req, res) => {
  try {
    const profileData = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: { exclude: 'password' },
      include: [
        {
          model: Game,
          as: 'user_games',
          through: UserGames,
        },
        {
          model: Friend,
          as: 'user_friends',
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
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET all games/user information that are stored for any user
router.get('/:username', withAuth, async (req, res) => {
  try {
    const profileData = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: 'password' },
      include: [
        {
          model: Game,
          as: 'user_games',
          through: UserGames,
        },
        {
          model: Friend,
          as: 'user_friends',
          through: UserFriends,
        },
      ],
    });

    const profile = profileData.get({ plain: true });
    const games = profile.user_games;
    const friends = profile.user_friends;

    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: ['username'],
    });
    const user = userData.get({ plain: true });

    // if the current session username matches the user profile, go to current user's profile (so they can instead see edit profile vs connect button)
    if (profile.username == user.username) {
      res.render('profile', {
        ...profile,
        games,
        friends,
        user,
        loggedIn: req.session.loggedIn,
      });
    } else {
      // render a profile of other users
      res.render('other-user-profile', {
        ...profile,
        games,
        friends,
        user,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET the edit profile page
router.get('/edit/:username', withAuth, async (req, res) => {
  try {
    const profileData = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: [
        'username',
        'interestedGenre',
        'preferredPlatform',
        'aboutMe',
      ],
    });

    const profile = profileData.get({ plain: true });

    res.render('updateProfile', {
      profile,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ---------------------------------------------------------------

module.exports = router;
