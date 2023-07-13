const sequelize = require("../config/connection");
const { User, Game, UserGames } = require("../models");

const userData = require("./userData.json");
const gameData = require("./gameData.json");
const userGamesData = require("./userGamesData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed users
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed games
    await Game.bulkCreate(gameData, {
      individualHooks: true,
      returning: true,
    });

    // Seed usergames
    await UserGames.bulkCreate(userGamesData, {
      individualHooks: true,
      returning: true,
    });

    console.log("Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.log("Error seeding database", error);
    process.exit(1);
  }
};

seedDatabase();
