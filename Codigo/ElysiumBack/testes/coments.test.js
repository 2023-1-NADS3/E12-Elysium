const comentario = require('../controllers/coments.controller')
const db = require('../models')
const Coments = db.Coments

test('Deve criar um comentario com sucesso', async () => {
  //data falsa
  const req = {
    body: {
      coment: 'Este e um comentario',
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const createMock = jest.spyOn(Coments, 'create').mockResolvedValue({})

  //chama a funçao de criçao
  await comentario.create(req, res)

  //verifica se a funçao foi chamada corretamente
  expect(createMock).toHaveBeenCalledWith({
    coment: 'Este e um comentario',
  })

  expect(res.send).toHaveBeenCalledWith({ message: 'Comentario criado com sucesso!' })
  expect(res.status).not.toHaveBeenCalledWith()

  createMock.mockRestore()
})

test('Deve retornar erro se o campo de comentario estiver vazio', async () => {
  //data falsa
  const req = {
    body: {
      coment: '',
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const createMock = jest.spyOn(Coments, 'create').mockResolvedValue({})

  //chama a funçao de criçao
  await comentario.create(req, res)

  //verifica se a funçao foi chamada corretamente
  expect(createMock).not.toHaveBeenCalled()

  expect(res.status).toHaveBeenCalledWith(400)
  expect(res.send).toHaveBeenCalledWith({ message: "O campo de comentario não pode estar vazio!" })

  createMock.mockRestore()
})


/*exports.create = async (req, res) => {
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
    res.send({ message: "Comentario criado com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Erro enquanto os comentarios eram recuperados"
    });
  }
};*/