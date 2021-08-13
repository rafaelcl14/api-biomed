const mysql = require("../mysql").pool;

exports.getUnidades = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM unidades;", (error, result, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        Unidades: result.map((prod) => {
          return {
            id_unidades: prod.id_unidades,
            nome: prod.nome,
            endereco: prod.endereco,
            link: prod.link,
            foto: prod.foto,

            request: {
              tipo: "GET",
              descricao: "Retorna todos os Unidades",
              url: "http://localhost:3000/Unidades/" + prod.id_Unidades,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
};

exports.postUnidades = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "insert into unidades (nome, endereco, link, foto) value (?,?,?,?);",
      [req.body.nome, req.body.preco, req.file.path],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Unidade inserida com sucesso",
          produtoCriado: {
            id_produtos: result.id_produtos,
            nome: req.body.nome,
            preco: req.body.preco,
            imagem_produto: req.file.path,
            request: {
              tipo: "POST",
              descricao: "Insere um produto",
              url: "http://localhost:3000/produtos",
            },
          },
        };
        return res.status(201).send(response);
      }
    );
  });
};

exports.getUmProduto = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE id_produtos = ?;",
      [req.params.id_produtos],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: "Não foi encontrado produto com este ID",
          });
        }
        const response = {
          produto: {
            id_produtos: result[0].id_produtos,
            nome: result[0].nome,
            preco: result[0].preco,
            imagem_produto: result[0].imagem_produto,
            request: {
              tipo: "POST",
              descricao: "Retorna um produto",
              url: "http://localhost:3000/produtos",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
};

exports.updateProduto = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE produtos 
            SET nome = ?,
                preco = ?
            WHERE 
                id_produtos = ?`,
      [req.body.nome, req.body.preco, req.body.id_produtos],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Produto atualizado com sucesso",
          produtoAtualizado: {
            id_produtos: req.body.id_produtos,
            nome: req.body.nome,
            preco: req.body.preco,
            request: {
              tipo: "GET",
              descricao: "Retorna o produto inserido",
              url: "http://localhost:3000/produtos" + req.body.id_produtos,
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
};

exports.deleteProduto = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `DELETE FROM produtos WHERE id_produtos = ?`,
      [req.body.id_produtos],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Produto removido com sucesso",
          request: {
            tipo: "POST",
            descricao: "Insere um produto",
            url: "http://localhost:3000/produtos",
          },
        };
        res.status(202).send(response);
      }
    );
  });
};
