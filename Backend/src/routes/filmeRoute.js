const express = require('express');
const router = express.Router();
//importar os controladores


const filmeController = require('../controllers/filmeController');






router.post('/delete/:id', filmeController.filme_delete);

router.post('/create', filmeController.filme_create);

router.put('/update/:id',filmeController.filme_update);

router.get('/get/:id', filmeController.filme_detail);

router.get('/list', filmeController.filme_list);


module.exports = router;
