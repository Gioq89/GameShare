// import sequelize and dotenv packages
const Sequelize = require("sequelize");
require("dotenv").config();

// create the sequelize object for exporting to server.js
let sequelize;

// uses sequelize to connect the user to the database using the credentials in .env
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

// export the object now complete with MySQL connection
module.exports = sequelize;
