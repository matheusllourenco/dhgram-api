const { User } = require("../models");
const bcrypt = require("bcrypt");

const usercontroller = {
  store: async (req, res) => {
    const { name, surname, username, email, password } = req.body;
    try {
      const newUser = await User.create({
        name,
        surname,
        email,
        username,
        password: bcrypt.hashSync(password, 10),
      });

      return res.status(201).json(newUser);

    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeConnectionRefusedError") {
        return res.status(500).json({
          error: true,
          msg: "Sem conexão com o banco de dados, tente novamente!",
        });
      }
      if (e.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json(e.parent.sqlMessage);
      }
      return res.status(400).json({
        error: true,
        msg: "Erro na requisição tente novamente!",
      });
    }
  },
  index: async (req, res) => {
    const users = await User.findAll();

    return res.status(200).json(users);
  }

};

module.exports = usercontroller;
