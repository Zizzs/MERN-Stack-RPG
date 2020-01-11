const keys = require("../../config/keys");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../models/User");

// Load Nodemailer
const nodemailer = require("nodemailer");

const sendResetEmail = (req, res) => {
  const email = req.body.email;
  if (email === "") {
    res.status(400).send("email required");
  }
  console.error(email);
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      (user.resetPasswordToken = token),
        (user.resetPasswordExpires = Date.now() + 3600000),
        user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: keys.emailAddress,
          pass: keys.emailPassword
        }
      });

      const mailOptions = {
        from: "VoidRPGGame@gmail.com",
        to: user.email,
        subject: "Link To Reset Password",
        text: `You are receiving this because you or someone else have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
        http://localhost:3000/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n
        `
      };

      console.log("Sending Email");

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error("There was an error: ", err);
        } else {
          console.log("Email Sent");
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
};

const checkToken = (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }).then(user => {
    if (!user) {
      console.log("Password Reset Link is Invalid or Expired");
      res.json("Password Reset Link is Invalid or Expired");
    } else {
      res.status(200).send({
        username: user.name,
        email: user.email,
        message: "good"
      });
    }
  });
};

const updatePassword = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      console.log("Retrieved user");
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          user.password = hash;
          (user.resetPasswordToken = "None"),
            (user.resetPasswordExpires = Date.now());
          user.save().then(() => {
            console.log("Password Updated");
            res.status(200).send({ message: "updated" });
          });
        });
      });
    } else {
      console.log("No user exists in the db to update!");
      res.status(404).json("No user exists in the db to update!");
    }
  });
};

exports.updatePassword = updatePassword;
exports.checkToken = checkToken;
exports.sendResetEmail = sendResetEmail;
