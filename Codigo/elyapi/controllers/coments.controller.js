const db = require('../models');
const Coments = db.Coments;
const Op = db.Sequelize.Op;
const Posts = db.Posts
const Users = db.Users

exports.create = async (req, res) => {
  if (!req.body.coment) {
    res.status(400).send({
      message: "O campo de comentario não pode estar vazio!"
    });
    return;
  }

  const coments = {
    coment: req.body.coment,
  };

  try {
    const createdComent = await Coments.create(coments);
    await createdComent.addUsers(req.body.UserId);
    await createdComent.addPosts(req.body.PostId);
    res.send({ message: "Comentario criado com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Erro enquanto os comentarios eram recuperados"
    });
  }
};

//muda isso para achar todos os comentarios que tem o mesmo id do post
exports.findAll = (req, res) => {
  const PostId = req.params.PostId;
  var condition = PostId ? { PostId: PostId } : null;

  Coments.findAll({
    include:
      [{
        model: Posts,
        where: { id: PostId },
        through: { attributes: [] }
      
    }]}
  )
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