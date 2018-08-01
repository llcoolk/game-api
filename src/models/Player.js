const sequelize = require('./index');
const Sequelize = require('sequelize');
const Team = require('./Team');

const Player = sequelize.define("player", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

Player.belongsTo(Team);
Team.hasMany(Player);

// Player.sync({
//   force: true
// }).then(() => {
//   return Player.create({
//     firstName: 'Justin',
//     lastName: 'Kim',
//   });
// });

module.exports = Player;