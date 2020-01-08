const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Save the User's Location in the Token
const saveLocalUser = (req, res) => {
  //console.log(req.body);
  const userData = req.body;
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
        token: "Bearer " + token,
        user: payload
      });
    }
  );
};

exports.saveLocalUser = saveLocalUser;
