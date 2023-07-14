const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');
// --------------------------------------------------------------
// TO DO: Add a dashboard that shows games?

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
