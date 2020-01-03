const express = require("express");
const User = require("../../models/User");

// Give the user an item generated elsewhere.
const giveItem = (req, res) => {
  const { userData, item } = req.body;
  User.findOne({ _id: userData.id }, function(err, user) {
    if (!err) {
      if (!user instanceof User) {
        user = new User();
        user = userData;
      }
      user.character.items.push(item);
      user.save(function(err) {
        if (!err) {
          console.log(`${user.name} got a ${item.name}`);
        } else {
          console.log(`Error: Could not save item: ${item.name}`);
        }
      });
    }
  });
};

exports.giveItem = giveItem;
