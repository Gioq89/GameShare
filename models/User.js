// import bcrypt, sequelize objects
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

// create User class that includes checkPassword function
class User extends Model {
  // checkPassword uses bcrypt to compare the session password to the stored password
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

// create the model for user data, which includes
// interested genres, preferred platform, and biography
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    interestedGenre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A',
    },
    preferredPlatform: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A',
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'N/A',
    },
  },

  // creates a hook that runs before the new User is stored
  // takes the new user's inputted password and uses bcrypt to hash the password with 10 rounds of salt
  // the hashed password is returned and stored
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10,
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  },
);

module.exports = User;
