const login = require('../controllers/auth.controller')
const bcrypt = require("bcryptjs");
const db = require("../models");
const Users = db.Users;

test('Deve cadastra um usuario e enviar uma mensagem de sucesso', async() => {
    //data falsa
    const req = {
        body: {
            username: 'testeuser',
            email: 'test@testexample.com',
            password: 'passwordteste123',
        },
    }

    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
    }

    const hashSyncMock = jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashPassword')
    const createMock = jest.spyOn(Users, 'create').mockResolvedValue({})

    //chama a função de cadastro
    await login.signup(req, res)

    //verifica se a função foi chamada corretamente
    expect(createMock).toHaveBeenCalledWith({
        username: 'testeuser',
        email: 'test@testexample.com',
        password: 'hashPassword',
    })

    
    expect(res.send).toHaveBeenCalledWith({ message: 'Usuario registrado' })
    expect(res.status).not.toHaveBeenCalledWith()
    
    hashSyncMock.mockRestore();
    createMock.mockRestore()


})

test('Deve lidar com erros e enviar mensagens de erros', async () => {
  
        //data falsa
    const req = {
        body: {
            username: 'testeuser',
            email: 'test@testexample.com',
            password: 'passwordteste123',
        },
    }

    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
    }

    const error = new Error('Erro com o db')
    const createMock = jest.spyOn(Users, 'create').mockRejectedValue(error)

    await login.signup(req, res)

    expect(createMock).toHaveBeenCalledWith({
        username: 'testeuser',
        email: 'test@testexample.com',
        password: expect.any(String),
    })

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({ message: error.message })
    
    createMock.mockRestore()
})
