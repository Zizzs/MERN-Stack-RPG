const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const saveUserModule = require("./routes/api/saveuser");
const getUserModule = require("./routes/api/getuser");
const locationModule = require("./routes/api/saveLocalUser");

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
app.use("/api/saveLocalUser", locationModule.saveLocalUser);

// Save Database User Data
app.post("/api/saveUser", saveUserModule.saveUser);

// Routes
app.use("/api/users", users);
app.get("/api/getUser", getUserModule.getUser);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Server is up and running on port ${port} !`)
);

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
