const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

// create Game class
class Game extends Model {}

// stores game id, title, genre, platform, description, url, thumbnail, and ids of users who play it
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    game_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    game_thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game',
  },
);

module.exports = Game;
