const router = require('express').Router();
const { User, Game, UserGames, Friend, UserFriends } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user and add user to friend table to assign friend id
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const dbFriendData = await Friend.create({
      username: req.body.username,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json({ dbUserData, dbFriendData });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------------------
// haven't added withAuth yet
// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
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

    const users = userData.map((user) => user.get({ plain: true }));

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a user by their username
router.get('/:username', async (req, res) => {
  try {
    const userData = await User.findOne({
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

    const user = userData.get({ plain: true });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE current user's information (what genres they are interested in, the platform they play on, their bio)
router.put('/:username', async (req, res) => {
  try {
    const userData = await User.update(
      {
        interestedGenre: req.body.genre,
        preferredPlatform: req.body.platform,
        aboutMe: req.body.aboutme,
      },
      {
        where: {
          // change to req.session.username
          username: 'user1',
        },
      },
    );

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET users by what their interested genre of game is
router.get('/genre/:genre', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        interestedGenre: req.params.genre,
      },
      attributes: ['id', 'username', 'interestedGenre'],
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET users by what their interested genre of game is
router.get('/platform/:platform', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        preferredPlatform: req.params.platform,
      },
      attributes: ['id', 'username', 'preferred_platform'],
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a user to the current user's friends list
router.post('/:user/add/:friend', async (req, res) => {
  try {
    const friendData = await Friend.findOne({
      where: {
        username: req.params.friend,
      },
    });

    const friend = friendData.get({ plain: true });

    const user = await User.findOne({
      where: {
        username: req.params.user,
      },
      attributes: ['id', 'username'],
      include: {
        model: Friend,
        as: 'user_friends',
        through: UserFriends,
      },
    });

    // add a friend id to the user's friends list
    const user_to_friend = await UserFriends.create({
      user_id: user.id,
      friend_id: friend.id,
    });

    // add a user's id to their friend's friends list
    const friend_to_user = await UserFriends.create({
      user_id: friend.id,
      friend_id: user.id,
    });

    res.json({
      message: `${user.username} and ${friend.username} are now friends!`,
      user_to_friend,
      friend_to_user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
