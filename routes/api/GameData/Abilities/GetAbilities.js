const abilitiesModule = require("./Abilities");

// Get the User
const getAllAbilities = (req, res) => {
  res.status(200).send({
    abilities: abilitiesModule.Abilities
  });
};

exports.getAllAbilities = getAllAbilities;
