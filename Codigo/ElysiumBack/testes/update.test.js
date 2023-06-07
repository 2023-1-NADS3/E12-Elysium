const postagens = require('../controllers/post.controller')
const db = require('../models')
const Post = db.Posts

test('Deve atualizar um post', async () => {
  const post = {
    id: 1,
    title: 'Este e um post',
    desc: 'Este e um post de descriçao',
    content: 'Este e um post de conteudo',
  };

  const req = {
    params: {
        id: 1
      },
    body: {
      title: 'Novo título',
      desc: 'Nova descrição',
      content: 'Novo conteúdo',
    },
  };

  const res = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const updateMock = jest.spyOn(Post, 'update').mockResolvedValue(1);

  await postagens.update(req, res);


  expect(updateMock).toHaveBeenCalledWith(
    {
      title: 'Novo título',
      desc: 'Nova descrição',
      content: 'Novo conteúdo',
    },
    {
      where: { id: post.id },
    }
  );

  expect(res.send).toHaveBeenCalledWith({ message: 'Post foi modificado com sucesso.' });
  expect(res.status).not.toHaveBeenCalledWith();

  updateMock.mockRestore();
});