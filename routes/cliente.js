const express = require("express");
const router = express.Router();
const multer = require("multer");
const login = require("../middleware/login");

const ClienteController = require("../controllers/cliente-controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// Pegando todos os produtos.
router.get("/", ClienteController.getCliente);
// Inserindo um produto.
router.post("/", ClienteController.postClientes);
// Buscando um unico produto expecifico
router.get("/:id_cliente", ClienteController.getUmCliente);
// // Atualiza produto
// router.patch("/", login, ClienteController.updateProduto);
// // Deleta produto
// router.delete("/", login, ClienteController.deleteProduto);

module.exports = router;
