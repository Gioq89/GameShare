const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------------------
// haven't added withAuth yet
// GET a user by their username
router.get("/:username", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: "password" },
    });

    const user = userData.get({ plain: true });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// UPDATE current user's information (what genres they are interested in, the platform they play on, their bio)
router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(
      {
        interestedGenres: req.body.user_genres,
        preferredPlatform: req.body.user_platform,
        aboutMe: req.body.user_bio,
      },
      {
        where: {
          // change this to req.params.user_id once logged in
          id: req.params.id,
        },
      }
    );

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET users by what their interested genre of game is
router.get("/genre/:genre", async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        interestedGenres: req.params.genre,
      },
      attributes: ["id", "username", "interestedGenres"],
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET users by what their interested genre of game is
router.get("/platform/:platform", async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        preferredPlatform: req.params.platform,
      },
      attributes: ["id", "username", "preferred_platform"],
    });

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// --------------------------------------------------------------------------

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
