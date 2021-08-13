const express = require("express");
const router = express.Router();
const PesquisaController = require("../controllers/pesquisa-controller");

// Pegando todos os Pesquisa.
router.get("/", PesquisaController.getPesquisa);
// Inserindo um pedido.
router.post("/", PesquisaController.postPesquisa);
// // Buscando um unico pedido expecifico
// router.get('/:id_pedido',   PesquisaController.getUmPedido );
// // Deletando um produto.
// router.delete('/', PesquisaController.deletePedido);

module.exports = router;
