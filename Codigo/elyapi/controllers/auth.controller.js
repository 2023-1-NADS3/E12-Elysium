const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Salvando o usuario
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.send({ message: "Usuario registrado" })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Usuario não encontrado" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Senha invalida!",
      });
    }

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Deslogando!"
    });
  } catch (err) {
    this.next(err);
  }
};


exports.findUsers = async (req, res) => {
  const users = await User.findAll()
  res.send(users)
}