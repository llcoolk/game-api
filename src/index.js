const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'dizpuuiq_llcoolk',
  'dizpuuiq_llcoolk',
  'llcoolk!', {
    host: 'dionimercado.com',
    dialect: 'mysql',
    port: 3306,
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Player = sequelize.define(
  'players', {

    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    }
  }
);

// Player.sync({
//   force: true
// }).then(() => {
//   // Table created
//   return Player.create({
//     firstName: 'Justin',
//     lastName: 'Kim',
//     age: 21
//   });
// });

// User.findOne().then(user => {
//   console.log(user.get('firstName'));
// });


app.get('/', (req, res) => {
  Player.findAll({})
    .then(players => {
      res.json(players);
    })
});

app.get('/player/:id', (req, res) => {
  Player.findOne({
    where: {
      id: req.params.id,
    },
  }).then(player => {
    res.json(player);
  });
});

app.post('/player', (req, res) => {
  const player = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age
  };
  Player.create(player)
    .then(player = res.json(player))
    .catch(err => res.json({
      Error: err
    }));
});

app.put('/player/:id', (req, res) => {
  const {
    firstName,
    lastName,
    age
  } = req.body;

  const player = {};

  if (firstName) {
    player.firstName = firstName
  }
  if (lastName) {
    player.lastName = lastName
  }
  if (age) {
    player.age = age
  }

  Player.update(player, {
      where: {
        id: req.params.id,
      },
    })
    .then(player => res.json(player))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});

app.delete('/player/:id', (req, res) => {
  Player.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(players => res.json(players))
    .catch(err =>
      res.json({
        Error: err,
      })
    );
});


app.listen(5000, () => console.log("Server running at http://localhost:5000"))