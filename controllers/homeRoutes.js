const router = require('express').Router();
const { Game, User } = require('../models');
const axios = require('axios');
const shuffle = require('shuffle-array');
const withAuth = require('../utils/auth');
// --------------------------------------------------------------
// GET all games and show them on the homepage
router.get('/dashboard', async (req, res) => {
  try {
    const gamesData = await Game.findAll();

    const games_data = gamesData.map((game) => game.get({ plain: true }));

    const games = shuffle(games_data);
    // render the homepage and pass that the user is logged in
    res.render('dashboard', {
      games,
      // logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one game by clicking on it to get full info
router.get('/dashboard/games/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
    });
    const game = gameData.get({ plain: true });

    // // get username to associate who's library to add to if add game button is clicked
    const userData = await User.findOne({
      where: {
        // username: req.session.username
        username: 'user1',
      },
      attributes: ['username'],
    });

    const user = userData.get({ plain: true });

    // call in the API to get full info on a game (since this information is unable to be retrieved from the get all route for the local database)
    const response = await axios.get(
      `https://www.freetogame.com/api/game?id=${req.params.id}`,
    );
    const info = response.data;
    const screenshots = info.screenshots;

    // render the homepage and pass that the user is logged in
    res.render('gameInfo', {
      game,
      user,
      info,
      screenshots,
      // logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// redirect to the login page if the user is not logged in
router.get('/login', (req, res) => {
  // if a session exists, redirect the user to the homepage; else redirect to login screen
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// redirect to the signup page if user wants to sign up
router.get('/signup', (req, res) => {
  // if a session exists, redirect the user to the homepage; else redirect to login screen
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
