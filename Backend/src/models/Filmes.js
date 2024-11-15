// models/Filme.js
var Sequelize = require('sequelize');
var SequelizeDB = require('./database');
var generos = require('./generos')



var Filme = SequelizeDB.define('Filmes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    photo: Sequelize.STRING,
    description: Sequelize.STRING,
    genreID:{
        type: Sequelize.INTEGER,
        references: {
        model: generos,
        key: 'id',
        onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
        }
    }

},
{ 
    timestamps: false,
})


Filme.belongsTo(generos, {
    foreignKey: 'genreID',
    as: 'genero'
});

module.exports = Filme;



