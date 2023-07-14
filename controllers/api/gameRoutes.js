const router = require("express").Router();
const withAuth = require("../../utils/auth");
// import the axios package to help fetch data from the FreetoGame API
const axios = require("axios");
const { User, Game, UserGames } = require("../../models");
const { Op } = require("sequelize");

// ----------------------------------------------------------------------------
// STRICTLY THROUGH AXIOS (not stored in database; accessing API directly)
// GET all games from the API
router.get("/freetogame", async (req, res) => {
  try {
    const response = await axios.get(`http://www.freetogame.com/api/games`);
    const games_data = response.data;

    res.json(games_data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET single game by id from API
router.get("/freetogame/id/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://www.freetogame.com/api/game?id=${req.params.id}`
    );
    const game_data = response.data;

    res.json(game_data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET games by platform from API
router.get("/freetogame/platform/:platform", async (req, res) => {
  try {
    const response = await axios.get(
      `http://www.freetogame.com/api/games?platform=${req.params.platform}`
    );
    const games_data = response.data;

    res.json(games_data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET games by category from API
router.get("/freetogame/category/:category", async (req, res) => {
  try {
    const response = await axios.get(
      `http://www.freetogame.com/api/games?category=${req.params.category}`
    );
    const games_data = response.data;

    res.json(games_data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------------------------------------------------------------------------
// THROUGH DATABASE
// POST games from API into database
router.post("/", async (req, res) => {
  try {
    const response = await axios.get(`http://www.freetogame.com/api/games`);
    const games_data = response.data;

    for (const game of games_data) {
      await Game.create({
        id: game.id,
        game_title: game.title,
        game_genre: game.genre,
        game_platform: game.platform,
        game_description: game.short_description,
        game_url: game.game_url,
        game_thumbnail: game.thumbnail,
      });
    }

    res.status(200).json({ message: "Games successfully stored!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET all games that are in the application database (stored from the API)
router.get("/", async (req, res) => {
  try {
    const gameData = await Game.findAll();

    const games = gameData.map((game) => game.get({ plain: true }));

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET single game by id
router.get("/id/:id", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);

    const game = gameData.get({ plain: true });

    res.json(game);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET games by game name
router.get("/:game", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      // Op.like checks for if game_title contains the params input of game
      // deals with cases where games may have similar titles/user may not know full name
      where: {
        game_title: {
          [Op.like]: `%${req.params.game}%`,
        },
      },
    });

    const games = gameData.map((game) => game.get({ plain: true }));

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET games by platform
router.get("/platform/:platform", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      // Op.like checks for if game_platform contains the params input of platform
      // deals with cases where user types in 'pc' and find games with 'PC (Windows)'
      where: {
        game_platform: {
          [Op.like]: `%${req.params.platform}%`,
        },
      },
    });

    const games = gameData.map((game) => game.get({ plain: true }));

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET games by category
router.get("/category/:category", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      where: {
        game_genre: req.params.category,
      },
    });

    const games = gameData.map((game) => game.get({ plain: true }));

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST a game to a user's game list once they choose to add it
router.post("/:username/add/:id", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);

    const game = gameData.get({ plain: true });

    // change to req.session.username
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: ["id", "username"],
      include: {
        model: Game,
        as: "user_games",
        through: UserGames,
      },
    });

    const gameInfo = await UserGames.create({
      user_id: user.id,
      game_id: game.id,
    });

    res.json(gameInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
