const mysql = require("../mysql").pool;

exports.getPesquisa = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM pesquisa;", (error, result, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        pesquisa: result.map((prod) => {
          return {
            id_pesquisa: prod.id_pesquisa,
            fk_client: prod.client,
            fk_unidades: prod.fk_unidades,
            fk_respostas: prod.fk_respostas,
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
};

exports.postPesquisa = (req, res, nest) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "insert into pesquisa (fk_cliente, fk_unidades, fk_respostas) value (?,?,?);",
      [req.body.fk_cliente, req.body.fk_unidades, req.body.fk_respostas],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: "Pesquisa salva com sucesso",
          pesquisaCadastrada: {
            id_pesquisa: result.id_pesquisa,
            fk_cliente: req.body.fk_cliente,
            fk_unidades: req.body.fk_unidades,
            fk_respostas: req.body.fk_respostas,
          },
        };
        return res.status(201).send(response);
      }
    );
  });
};

// exports.getUmPedido = (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query(
//       "SELECT * FROM pedidos WHERE id_pedido = ?;",
//       [req.params.id_pedido],
//       (error, result, fields) => {
//         if (error) {
//           return res.status(500).send({ error: error });
//         }
//         if (result.length == 0) {
//           return res.status(404).send({
//             mensagem: "Não foi encontrado pedido com este ID",
//           });
//         }
//         const response = {
//           pedido: {
//             id_pedido: result[0].id_pedido,
//             id_produtos: result[0].id_produtos,
//             quantidade: result[0].quantidade,
//             request: {
//               tipo: "GET",
//               descricao: "Retorna todos os pedidos",
//               url: "http://localhost:3000/pedidos",
//             },
//           },
//         };
//         return res.status(200).send(response);
//       }
//     );
//   });
// };

// exports.deletePedido = (req, res, next) => {
//   mysql.getConnection((error, conn) => {
//     if (error) {
//       return res.status(500).send({ error: error });
//     }
//     conn.query(
//       `DELETE FROM pedidos WHERE id_pedido = ?`,
//       [req.body.id_pedido],
//       (error, result, field) => {
//         conn.release();
//         if (error) {
//           return res.status(500).send({ error: error });
//         }
//         const response = {
//           mensagem: "Pedido removido com sucesso",
//           request: {
//             tipo: "POST",
//             descricao: "Insere um pedido",
//             url: "http://localhost:3000/pedidos",
//           },
//         };
//         res.status(202).send(response);
//       }
//     );
//   });
// };
