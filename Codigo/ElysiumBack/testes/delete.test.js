const postagens = require('../controllers/post.controller')
const db = require('../models')
const Post = db.Posts

test('Deve deletar um post', async () => {
const post = {
id: 1,
title: 'Este e um post',
desc: 'Este e um post de descriçao',
content: 'Este e um post de conteudo',
};

const destroyMock = jest.spyOn(Post, 'destroy').mockResolvedValue(1);

const req = {
params: {
id: post.id,
},
};

const res = {
send: jest.fn(),
status: jest.fn().mockReturnThis(),
};

await postagens.delete(req, res);

expect(destroyMock).toHaveBeenCalledWith(
{
where: { id: post.id },
}
);

expect(res.send).toHaveBeenCalledWith({ message: 'Post deletado com sucesso!' });

expect(res.status).not.toHaveBeenCalledWith();

destroyMock.mockRestore();
});

