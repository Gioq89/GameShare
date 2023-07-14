const sequelize = require('../config/connection');
const { User, Game, Friend, UserGames, UserFriends } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const friendData = require('./friendData.json');
const userGamesData = require('./userGamesData.json');
const userFriendsData = require('./userFriendsData.json');

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

    // Seed friends
    await Friend.bulkCreate(friendData, {
      individualHooks: true,
      returning: true,
    });

    // Seed user_games
    await UserGames.bulkCreate(userGamesData, {
      individualHooks: true,
      returning: true,
    });

    // Seed user_friends
    await UserFriends.bulkCreate(userFriendsData, {
      individualHooks: true,
      returning: true,
    });

    console.log('Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.log('Error seeding database', error);
    process.exit(1);
  }
};

seedDatabase();