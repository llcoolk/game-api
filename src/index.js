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

const Player = sequelize.define("player", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

const Team = sequelize.define("team", {
  teamName: {
    type: Sequelize.STRING
  }
});

Player.belongsTo(Team);
Team.hasMany(Player);

// Team.sync({
//   force: true
// }).then(() => {
//   return Team.create({
//     teamName: "Angels"
//   });
// });

// Player.sync({
//   force: true
// }).then(() => {
//   return Player.create({
//     firstName: 'Justin',
//     lastName: 'Kim',
//   });
// });

app.get("/team", (req, res) => {
  Team.findAll({}).then(findTeam => res.json(findTeam));
});

app.get("/team/:id", (req, res) => {
  Team.findOne({
    where: {
      id: req.params.id
    }
  }).then(findTeam => res.json(findTeam));
});

app.post("/team", (req, res) => {
  const newTeam = {
    teamName: req.body.teamName
  };

  Team.create(newTeam)
    .then(postTeam => res.json(postTeam))
    .catch(err => re.jon({
      Error: err
    }));
});

app.put("/team", (req, res) => {  
  Team.update(req.body, {    
      where: {      
        id: req.params.id    
      }  
    })    
    .then(updateTeam => res.json(updateTeam))    
    .catch(err => res.json({
      Error: err
    }));
});

app.delete("/team/:id", (req, res) => {
  Team.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deleteTeam => res.json(deleteTeam))
    .catch(err => res.json({
      Error: err
    }));
});


app.get("/player", (req, res) => {
  Player.findAll({}).then(players => res.json(players));
});

app.get("/player/:id", (req, res) => {
  Player.findOne({
    where: {
      id: req.params.id
    }
  }).then(data =>
    res.json(data));
});

app.post("/player", (req, res) => {

  const newPlayer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    teamId: req.body.teamId,
  };

  Player.create(newPlayer)
    .then(player => res.json(player))
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
    teamId
  } = req.body;

  const updatedPlayer = {};
  if (firstName) {
    updatedPlayer.firstName = firstName;
  }
  if (lastName) {
    updatedPlayer.lastName = lastName;
  }
  if (teamId) {
    updatedPlayer.teamId = teamId;
  }

  Player.update(updatedPlayer, {
      where: {
        id: req.params.id
      }
    })
    .then(player => res.json(player))
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
    .then(player => res.json(player))
    .catch(err =>
      res.json({
        Error: err
      })
    );
});



app.listen(5000, () => console.log("Server running at http://localhost:5000"));