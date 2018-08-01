const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "dizpuuiq_llcoolk",
  "dizpuuiq_llcoolk",
  "llcoolk!", {
    host: "dionimercado.com",
    dialect: "mysql",
    port: 3306,
    operatorsAliases: false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const Team = sequelize.define("team", {
  teamName: {
    type: Sequelize.STRING
  }
});

const Player = sequelize.define("player", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
});

Player.sync({
  force: true
}).then(() => {
  return Player.create({
    firstName: 'Justin',
    lastName: 'Kim',
    age: 21
  });
});

app.get("/player", (req, res) => {
  Player.findAll({}).then(Player => {
    res.json(Player);
  });
});

app.get("/player/:id", (req, res) => {
  Player.findOne({
    where: {
      id: req.params.id
    }
  }).then(Player => {
    res.json(Player);
  });
});

app.post("/player", (req, res) => {
  const Player = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age
  };
  Player.create(player)
    .then((Player = res.json(Player)))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

app.put("/player/:id", (req, res) => {
  const {
    firstName,
    lastName,
    age
  } = req.body;

  const Player = {};

  if (firstName) {
    Player.firstName = firstName;
  }
  if (lastName) {
    Player.lastName = lastName;
  }
  if (age) {
    Player.age = age;
  }

  Player.update(player, {
      where: {
        id: req.params.id
      }
    })
    .then(Player => res.json(Player))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

app.delete("/player/:id", (req, res) => {
  Player.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(Players => res.json(Players))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));