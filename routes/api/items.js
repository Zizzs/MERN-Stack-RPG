const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Give the user an item generated elsewhere.
const giveItem = (req, res) => {
  const { userData, item } = req.body;
  userData.character.items.push(item);
  const payload = {
    id: userData.id,
    name: userData.name,
    character: userData.character
  };
  //console.log(payload);
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

exports.giveItem = giveItem;
