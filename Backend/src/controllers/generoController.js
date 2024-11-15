var Genero = require('../models/generos');
var sequelize = require('../models/database');


const controllers = {};
sequelize.sync();

controllers.genero_list = async (req, res) => {
	try {
		const data = await Genero.findAll({});
		res.json({ sucess: true, data: data });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
}

controllers.genero_detail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Genero.findAll({ where: { id: id } });
        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

controllers.genero_create = async (req, res) => {
    console.log("i got hre")
 const { description } = req.body;
    const data = await Genero.create({
        description: description
    })
    .then(function(data) {
        return data
    })
    .catch(error => {
        return error;
    })

    res.status(200).json({
        success: true,
        message: "Genero criado",
        data: data
    });
}


controllers.genero_update = async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const data = await Genero.update(
			{ ...body },
			{
				where: { id: id }
			}
		);
		res.json({ success: true, data: data, message: "Updated successful" });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
}

controllers.genero_delete = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await Genero.destroy({ where: { id: id } });
        res.json({ success: true, deleted: del, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = controllers;
