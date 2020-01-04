const express = require("express");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Get the User
const getUser = (req, res) => {
  const userData = JSON.parse(req.query.data);
  User.findOne({ _id: userData.id }, function(err, user) {
    if (!err) {
      const payload = {
        id: user.id,
        name: user.name,
        character: user.character
      };
      // Sign token
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
    }
  });
};

exports.getUser = getUser;
