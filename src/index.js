const express = require("express");
const sequelize = require("./models/index")
const app = express();
const Players = require('./routes/players');
const Teams = require('./routes/teams');

app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/teams", Teams);
app.use("/players", Players);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));