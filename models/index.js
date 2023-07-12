// import the models
const User = require("./User");
const Game = require("./Game");
const Friend = require("./Friend");

// user has many games, user identified by their id
User.hasMany(Game, {
  foreignKey: "gameUser_id",
  onDelete: "CASCADE",
});

// game belongs to a user
Game.belongsTo(User, {
  foreignKey: "gameUser_id",
});

// user has many friends, friends identified by their id
User.hasMany(Friend, {
  foreignKey: "friend_id",
  onDelete: "CASCADE",
});

// friend belongs to a user
Friend.belongsTo(User, {
  foreignKey: "friend_id",
});

// export the model associations
module.exports = { User, Game, Friend };
