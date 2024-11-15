var sequelize = require("../models/database");
var Genero = require("../models/generos");
var Filme = require("../models/Filmes");

const controllers = {};
sequelize.sync(); // Sincroniza os modelos com o banco de dados

controllers.filme_list = async (req, res) => {
  try {
    const data = await Filme.findAll({ include: [{ model: Genero, as: 'genero' }] });
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

controllers.filme_detail = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Filme.findAll({
      include: [{ model: Genero, as: 'genero' }],
      where: { id: id },
    });
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

controllers.filme_create = async (req, res) => {
  try {
    const { description, title, photo, genreID } = req.body;

    const data = await Filme.create({
      title: title,
      photo: photo,
      description: description,
      genreID: genreID
    });
    
    res.status(200).json({
      success: true,
      message: "Movie added!",
      data: data
    });

  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({
      success: false,
      message: "Error creating movie",
      error: error.message
    });
  }
};

controllers.filme_update = async (req, res) => {
  const { id } = req.params;
  const { title, photo, description, genreID } = req.body;
  try {
    const data = await Filme.update({
      title: title,
      photo: photo,
      description: description,
      genreID: genreID
    }, { where: { id: id } });
    
    res.json({ success: true, data: data, message: "Movie successfully updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating movie", error: error.message });
  }
};

controllers.filme_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Filme.destroy({ where: { id: id } });
    res.json({ success: true, deleted: del, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = controllers;
