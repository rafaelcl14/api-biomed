const express = require("express");
const router = express.Router();
const multer = require("multer");
const login = require("../middleware/login");

const UnidadesController = require("../controllers/unidades-controller");

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
router.get("/", UnidadesController.getUnidades);
// Inserindo um produto.
router.post("/", UnidadesController.postUnidades);
// Buscando um unico produto expecifico
router.get("/:id_produtos", UnidadesController.getUmProduto);
// Atualiza produto
router.patch("/", login, UnidadesController.updateProduto);
// Deleta produto
router.delete("/", login, UnidadesController.deleteProduto);

module.exports = router;
