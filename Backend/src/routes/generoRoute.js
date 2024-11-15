const express = require('express');
const router = express.Router();

const generoController = require('../controllers/generoController');

router.get('/delete/:id', generoController.genero_delete);

router.post('/create', generoController.genero_create);

router.put('/update/:id',generoController.genero_update);

router.get('/get/:id', generoController.genero_detail);

router.get('/list', generoController.genero_list);



module.exports = router;
