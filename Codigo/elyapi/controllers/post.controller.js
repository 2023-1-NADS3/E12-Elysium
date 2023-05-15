const db = require('../models');
const Posts = db.Posts;
const Users = db.Users
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Titulo não pode estar vazio!"
    });
    return;
  }

  const post = {
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
    UserId: req.body.UserId
  }


  Posts.create(post)
    .then(post => {
      return post.addUsers(req.body.UserId, {
        through: {
          UserId: req.body.UserId
        }
      });
    })
    .then(() => {
      res.send({ message: "Post criado com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os posts eram recuperados"
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Posts.findAll({ where: condition, include:[Users]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os posts eram recuperados"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Posts.findByPk(id, {
    include: [
      {
        model: Users,
        attributes: ['username']
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: "Não foi possivel achar o post de id=" + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro recuperando o post de id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Posts.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post foi modificado com sucesso."
        });
      } else {
        res.send({
          message: "Não foi possivel encontrar o post " + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel o update do post com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Posts.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post deletado com sucesso!"
        });
      } else {
        res.send({
          message: "Não foi possivel deletar o post com  id=" + id + "Talvez ele não exista mais"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel deletar o post com  id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Posts.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: nums + "Todos os posts foram apagados com sucesso" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Tivemos um erro enquanto apagavamos os posts."
      });
    });
};
