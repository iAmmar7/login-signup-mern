const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// User Model
const User = require("../../models/User");

router.get('/test', (req, res) => res.json({ msg: "Route Works" }));

// Signup
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exist" })
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
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "User not found" })
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User Matched

            const payload = { id: user.id, name: user.name }

            // Sign Token
            jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });
          } else {
            return res.status(400).json({ password: "Password incorrect" })
          }
        })
    })
});

// Private Route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user)
})

module.exports = router;