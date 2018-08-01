const sequelize = require('./index');
const Sequelize = require('sequelize')

const Team = sequelize.define("team", {
  teamName: {
    type: Sequelize.STRING
  }
});

// Team.sync({
//   force: true
// }).then(() => {
//   return Team.create({
//     teamName: "Angels"
//   });
// });

module.exports = Team;