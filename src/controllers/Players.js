const Player = require('../models/Player');

const getAll = (req, res) => {
  Player.findAll({}).then(players => res.json(players));
}

const getOne = (req, res) => {
  Player.findOne({
    where: {
      id: req.params.id
    }
  }).then(data =>
    res.json(data));
}

const create = (req, res) => {

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
}

const update = (req, res) => {
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
}

const remove = (req, res) => {
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
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}