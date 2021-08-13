const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos-controller');


// Pegando todos os pedidos.
router.get('/', PedidosController.getPedidos);
// Inserindo um pedido.
router.post('/', PedidosController.postPedidos);
// Buscando um unico pedido expecifico
router.get('/:id_pedido',   PedidosController.getUmPedido );
// Deletando um produto.
router.delete('/', PedidosController.deletePedido);

module.exports = router;