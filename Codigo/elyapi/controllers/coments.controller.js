const db = require('../models');
const Coments = db.coments;
const Op = db.Sequelize.Op;
const Post = db.posts

exports.create = (req, res) => {
  if (!req.body.coment) {
    res.status(400).send({
      message: "O campo de comentario não pode estar vazio!"
    });
    return;
  }

  const coments = {
    coment: req.body.coment,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  };

  Coments.create(coments)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os comentarios eram recuperados"
      });
    });
};

//muda isso para achar todos os comentarios que tem o mesmo id do post
exports.findAll = (req, res) => {
  const postId = req.query.post_id;
  var condition = postId ? { postId: postId } : null;

  Coments.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os comentarios eram recuperados"
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Coments.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comentario foi modificado com sucesso."
        });
      } else {
        res.send({
          message: "Não foi possivel encontrar o Comentario de id: " + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel o update do Comentario com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Coments.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comentario deletado com sucesso!"
        });
      } else {
        res.send({
          message: "Não foi possivel deletar o Comentario com  id=" + id + "Talvez ele não exista mais"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel deletar o Comentario com  id=" + id
      });
    });
};