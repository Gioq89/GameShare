const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

// create UserFriends class
class UserFriends extends Model {}

UserFriends.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    friend_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "friend",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userfriends",
  }
);

module.exports = UserFriends;
