const mysql = require("../mysql").pool;

exports.getCliente = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM cliente;", (error, result, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        cliente: result.map((prod) => {
          return {
            id_cliente: prod.id_cliente,
            nome: prod.nome,
            email: prod.email,
            telefone: prod.telefone,
            cidade: prod.cidade,
            regras: prod.regras,
            termos: prod.termos,
            genero: prod.genero,
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
};

exports.postClientes = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "insert into cliente (nome, email, telefone, cidade, regras, termos, genero)value (?,?,?,?,?,?,?);",
      [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cidade,
        req.body.regras,
        req.body.termos,
        req.body.genero,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Cadastrado com sucesso",
          clientecadastrado: {
            id_cliente: result.id_cliente,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            cidade: req.body.cidade,
            regras: req.body.regras,
            termos: req.body.termos,
            genero: req.body.genero,
          },
        };
        return res.status(201).send(response);
      }
    );
  });
};

exports.getUmCliente = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM cliente WHERE id_cliente = ?;",
      [req.params.id_cliente],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res.status(404).send({
            mensagem: "Não foi encontrado o cliente com este ID",
          });
        }
        const response = {
          cliente: {
            id_cliente: result[0].id_cliente,
            nome: result[0].nome,
            email: result[0].email,
            telefone: result[0].telefone,
            cidade: result[0].cidade,
            regras: result[0].regras,
            termos: result[0].termos,
            genero: result[0].genero,
          },
        };
        return res.status(200).send(response);
      }
    );
  });
};

// exports.updateProduto = (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query(
//       `UPDATE produtos
//             SET nome = ?,
//                 preco = ?
//             WHERE
//                 id_produtos = ?`,
//       [req.body.nome, req.body.preco, req.body.id_produtos],
//       (error, result, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({ error: error });
//         }
//         const response = {
//           mensagem: "Produto atualizado com sucesso",
//           produtoAtualizado: {
//             id_produtos: req.body.id_produtos,
//             nome: req.body.nome,
//             preco: req.body.preco,
//             request: {
//               tipo: "GET",
//               descricao: "Retorna o produto inserido",
//               url: "http://localhost:3000/produtos" + req.body.id_produtos,
//             },
//           },
//         };
//         return res.status(202).send(response);
//       }
//     );
//   });
// };

// exports.deleteProduto = (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query(
//       `DELETE FROM produtos WHERE id_produtos = ?`,
//       [req.body.id_produtos],
//       (error, result, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({ error: error });
//         }
//         const response = {
//           mensagem: "Produto removido com sucesso",
//           request: {
//             tipo: "POST",
//             descricao: "Insere um produto",
//             url: "http://localhost:3000/produtos",
//           },
//         };
//         res.status(202).send(response);
//       }
//     );
//   });
// };
