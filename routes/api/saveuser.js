const User = require("../../models/User");

// Set the user's location to the current page
const saveUser = (req, res) => {
  const { userData } = req.body;
  User.findOne({ _id: userData.id }, function(err, user) {
    if (!err) {
      if (!user instanceof User) {
        user = new User();
        user = userData;
      }
      user.character.location = userData.character.location;
      user.save(function(err) {
        if (!err) {
          console.log(`Saved user: ${user.name}`);
        } else {
          console.log(`Error: Could not save user: ${location}`);
        }
      });
    }
  });
};

exports.saveUser = saveUser;
