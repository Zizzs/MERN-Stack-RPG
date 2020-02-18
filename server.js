const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const saveUserModule = require("./routes/api/saveuser");
const getUserModule = require("./routes/api/getuser");
const saveLocal = require("./routes/api/saveLocalUser");
const resetPassModule = require("./routes/api/resetPassword");
const abilitiesModule = require("./routes/api/GameData/Abilities/GetAbilities");
const itemsModule = require("./routes/api/GameData/Items/ItemGeneration");

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
// Connect to MongoDB

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport", passport);

// Save Local User Data
app.use("/api/saveLocalUser", saveLocal.saveLocalUser);

// Save Database User Data
app.post("/api/saveUser", saveUserModule.saveUser);

// Abilities Routes
app.get("/api/abilities/getAllAbilities", abilitiesModule.getAllAbilities);

// Item Routes
app.post("/api/items/generateItem", (req, res) => {
  itemsModule.generateItem(req, res);
});

// User Routes
app.use("/api/users", users);
app.get("/api/getUser", getUserModule.getUser);
app.use("/api/sendPasswordEmail", resetPassModule.sendResetEmail);
app.use("/api/confirmToken", resetPassModule.checkToken);
app.use("/api/updatePassword", resetPassModule.updatePassword);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Server is up and running on port ${port} !`)
);

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
