const router = require("express").Router();
const { Game, User } = require("../models");
const withAuth = require("../utils/auth");

// ---------------------------------------------------------------
// brainstorming; need to rearrange a lot of variables/work on logic

// gets all games/user information that are stored for the user
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll(
      {
        attributes: [
          "id",
          "game_title",
          "game_genre",
          "game_platform",
          "game_url",
          "game_thumbnail",
        ],
      },
      {
        where: {
          id: req.session.id,
        },
      }
    );

    const games = gameData.map((game) => game.get({ plain: true }));

    const userData = await User.findByPk(req.session.username, {
      attributes: [
        "username",
        "interestedGenre",
        "preferredPlatform",
        "aboutMe",
        // "user_games",
        // "friend_id",
      ],
    });

    const userInfo = userData.map((user) => user.get({ plain: true }));

    // render the homepage and pass that the user is logged in
    res.render("profile", {
      games,
      userInfo,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// gets any user's profile
router.get("/:username", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.username, {
      attributes: [
        "id",
        "game_title",
        "game_genre",
        "game_platform",
        "game_url",
        "game_thumbnail",
      ],
    });

    const games = gameData.get({ plain: true });

    const userData = await User.findByPk(req.params.username, {
      attributes: [
        "username",
        "interestedGenre",
        "preferredPlatform",
        "aboutMe",
        // "user_games",
        // "friend_id",
      ],
    });

    const userInfo = userData.map((user) => user.get({ plain: true }));

    // render the homepage and pass that the user is logged in
    res.render("profile", {
      games,
      userInfo,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ---------------------------------------------------------------

module.exports = router;
