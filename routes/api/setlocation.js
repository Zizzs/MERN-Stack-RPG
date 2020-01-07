const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Save the User's Location in the Token
const setLocation = (req, res) => {
  const { userData, location } = req.body;
  userData.character.location = location;
  const payload = {
    id: userData.id,
    name: userData.name,
    character: userData.character
  };
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 31556926 // 1 year in seconds
    },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    }
  );
};

exports.setLocation = setLocation;
