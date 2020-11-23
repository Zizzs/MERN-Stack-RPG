const User = require("../../models/User");

// Get the User
const getUser = (req, res) => {
  const userData = JSON.parse(req.query.data);
  User.findOne({ _id: userData.id }, function(err, user) {
    if (!err) {
      res.status(200).send({
        user: user
      });
    }
  });
};

exports.getUser = getUser;
