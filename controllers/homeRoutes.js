const router = require('express').Router();
const withAuth = require('../utils/auth');
// --------------------------------------------------------------
// GET the landing page for the website
router.get('/', async (req, res) => {
  try {
    // render the dashboard if the user is logged in already; if not, render the dashboard
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
    res.render('landing-page');
  } catch (error) {
    res.status(500).json(error);
  }
});

// redirect to the login page if the user is not logged in
router.get('/login', (req, res) => {
  // if a session exists, redirect the user to the homepage; else redirect to login screen
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// redirect to the signup page if user wants to sign up
router.get('/signup', (req, res) => {
  // if a session exists, redirect the user to the homepage; else redirect to login screen
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
