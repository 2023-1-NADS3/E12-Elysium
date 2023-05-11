const db = require('../models');
const Coments = db.coments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.coment) {
    res.status(400).send({
      message: "O campo de comentario não pode estar vazio!"
    });
    return;
  }

  const coments = {
      coment: req.body.coment
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

exports.findAll = (req, res) => {
  const coment = req.query.coment;
  var condition = coment ? { coment: { [Op.like]: `%${coment}%` } } : null;

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