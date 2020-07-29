const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');

router.post('/nuevoPedido', controller.nuevoPedido);
router.get('/pedidos', controller.obtenerPedidos);

router.post('/nuevoMenu', controller.nuevoMenu);
router.get('/menu', controller.obtenerMenu);

module.exports = router;