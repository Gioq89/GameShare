// import the models
const User = require("./User");
const Game = require("./Game");
const UserGames = require("./UserGames");
const Friend = require("./Friend");
const UserFriends = require("./UserFriends");

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

// a user can be friends with many other users
User.belongsToMany(Friend, {
  through: UserFriends,
  as: "user_friends",
  foreignKey: "user_id",
});

// a user can be friends with many other users
Friend.belongsToMany(User, {
  through: UserFriends,
  as: "friend_users",
  foreignKey: "friend_id",
});

// export the model associations
module.exports = { User, Game, UserGames, Friend, UserFriends };
