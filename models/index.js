// import the models
const User = require('./User');
const Game = require('./Game');
const UserGames = require('./UserGames');

// associations not working, need to fix

// a user can be a player to many games
User.belongsToMany(Game, {
  through: UserGames,
  as: 'user_games',
  foreignKey: 'user_id',
});

// a game can belong to many users
Game.belongsToMany(User, {
  through: UserGames,
  as: 'game_users',
  foreignKey: 'game_id',
});

// export the model associations
module.exports = { User, Game, UserGames };
