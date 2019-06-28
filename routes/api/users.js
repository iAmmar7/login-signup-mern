const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Validation Files
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");

// User Model
const User = require("../../models/User");

router.get('/test', (req, res) => res.json({ msg: "Route Works" }));

// Signup
router.post('/signup', (req, res) => {

  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        // Hash the Password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// Login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User Matched

            const payload = { id: user.id, name: user.name }

            // Sign Token
            jwt.sign(payload, keys.secretKey, { expiresIn: 60 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        })
    })
});

// Private Route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user)
})

module.exports = router;