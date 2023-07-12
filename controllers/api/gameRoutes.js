const router = require("express").Router();
const withAuth = require("../../utils/auth");
// import the axios package to help fetch data from the FreetoGame API
const axios = require("axios");

// GET all games from the API
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`http://www.freetogame.com/api/games`);
    const games_data = response.data;

    const games = games_data.map((game) => ({
      id: game.id,
      game_title: game.title,
      game_genre: game.genre,
      game_platform: game.platform,
      game_description: game.short_description,
      game_url: game.game_url,
      game_thumbnail: game.thumbnail,
    }));

    res.json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching all games!" });
  }
});

// GET single game by id
router.get("/id/:id", async (req, res) => {
  try {
    const game_id = req.params["id"];

    const response = await axios.get(
      `http://www.freetogame.com/api/game?id=${game_id}`
    );
    const game_data = response.data;

    const game = {
      id: game_data.id,
      game_title: game_data.title,
      game_genre: game_data.genre,
      game_platform: game_data.platform,
      game_description: game_data.short_description,
      game_url: game_data.game_url,
      game_thumbnail: game_data.thumbnail,
    };

    res.json(game);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the game!" });
  }
});

// GET games by platform
router.get("/platform/:platform", async (req, res) => {
  try {
    const game_platform = req.params["platform"];

    const response = await axios.get(
      `http://www.freetogame.com/api/games?platform=${game_platform}`
    );
    const games_data = response.data;

    const games = games_data.map((game) => ({
      id: game.id,
      game_title: game.title,
      game_genre: game.genre,
      game_platform: game.platform,
      game_description: game.short_description,
      game_url: game.game_url,
      game_thumbnail: game.thumbnail,
    }));

    res.json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the games!" });
  }
});

// GET games by category
router.get("/category/:category", async (req, res) => {
  try {
    const game_category = req.params["category"];

    const response = await axios.get(
      `http://www.freetogame.com/api/games?category=${game_category}`
    );
    const games_data = response.data;

    const games = games_data.map((game) => ({
      id: game.id,
      game_title: game.title,
      game_genre: game.genre,
      game_platform: game.platform,
      game_description: game.short_description,
      game_url: game.game_url,
      game_thumbnail: game.thumbnail,
    }));

    res.json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the games!" });
  }
});

module.exports = router;
