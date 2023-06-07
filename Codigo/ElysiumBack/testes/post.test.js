const postagens = require('../controllers/post.controller')
const db = require('../models')
const Post = db.Posts

test('Deve criar um post e enviar uma mensagem de sucesso', async () => {
  //data falsa
  const req = {
    body: {
      title: 'Este e um post',
      desc: 'Este e um post de descriçao',
      content: 'Este e um post de conteudo',
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const createMock = jest.spyOn(Post, 'create').mockResolvedValue({})

  //chama a funçao de criçao
  await postagens.create(req, res)

  //verifica se a funçao foi chamada corretamente
  expect(createMock).toHaveBeenCalledWith({
    title: 'Este e um post',
    desc: 'Este e um post de descriçao',
    content: 'Este e um post de conteudo',
  })

  expect(res.send).toHaveBeenCalledWith({ message: 'Post criado com sucesso!' })
  expect(res.status).not.toHaveBeenCalledWith()

  createMock.mockRestore()
})


test('Deve retornar erro se o titulo estiver vazio', async () => {
  //data falsa
  const req = {
    body: {
      title: '',
      desc: 'Este e um post de descriçao',
      content: 'Este e um post de conteudo',
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const createMock = jest.spyOn(Post, 'create').mockResolvedValue({})

  //chama a funçao de criçao
  await postagens.create(req, res)

  //verifica se a funçao foi chamada corretamente
  expect(createMock).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.send).toHaveBeenCalledWith({ message: "Titulo não pode estar vazio!" })

  createMock.mockRestore()
})

/*
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Titulo não pode estar vazio!"
    });
    return;
  }
  if (!req.body.desc) {
    res.status(400).send({
      message: "Descrição não pode estar vazio!"
    });
    return;
  }
  if (!req.body.content) {
    res.status(400).send({
      message: "Coteudo não pode estar vazio!"
    });
    return;
  }

  const post = {
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
  }


  Posts.create(post)
    .then(() => {
      res.send({ message: "Post criado com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro enquantos os posts eram recuperados"
      });
    });
};*/