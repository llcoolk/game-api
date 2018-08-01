const Team = require('../models/Team');

const getAll = (req, res) => {
  Team.findAll({}).then(findTeam => res.json(findTeam));
}

const getOne = (req, res) => {
  Team.findOne({
    where: {
      id: req.params.id
    }
  }).then(findTeam => res.json(findTeam));
}

const create = (req, res) => {
  const newTeam = {
    teamName: req.body.teamName
  }
  Team.create(newTeam)
    .then(postTeam => res.json(postTeam))
    .catch(err => re.jon({
      Error: err
    }));
}

const update = (req, res) => {  
  Team.update(req.body, {    
      where: {      
        id: req.params.id    
      }  
    })    
    .then(updateTeam => res.json(updateTeam))    
    .catch(err => res.json({
      Error: err
    }));
}

const remove = (req, res) => {
  Team.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deleteTeam => res.json(deleteTeam))
    .catch(err => res.json({
      Error: err
    }));
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}