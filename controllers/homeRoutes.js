const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');
// --------------------------------------------------------------
// GET all games and show them on the homepage
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll();

    const games = gameData.map((game) => game.get({ plain: true }));

    // render the homepage and pass that the user is logged in
    res.render("dashboard", {
      games,
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
