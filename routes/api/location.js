const User = require("../../models/User");

// Set the user's location to the current page
const setLocation = (req, res) => {
  const { userData, location } = req.body;
  User.findOne({ _id: userData.id }, function(err, user) {
    if (!err) {
      if (!user instanceof User) {
        user = new User();
        user = userData;
      }
      user.character.location = location;
      user.save(function(err) {
        if (!err) {
          console.log(`${user.name} moved to ${location}`);
        } else {
          console.log(`Error: Could not move to location: ${location}`);
        }
      });
    }
  });
};

exports.setLocation = setLocation;
