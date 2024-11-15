var Sequelize = require("sequelize");
var SequelizeDB = require("./database");

var Genero = SequelizeDB.define(
  "Generos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = Genero;
