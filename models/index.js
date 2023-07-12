// import the models
const User = require("./User");
const Game = require("./Game");

// associations not working, need to fix

// user has many games, user identified by their id
User.hasMany(Game, {
  foreignKey: "gameUser_id",
  onDelete: "CASCADE",
});

// game belongs to a user
Game.belongsTo(User, {
  foreignKey: "gameUser_id",
});

// export the model associations
module.exports = { User, Game };
