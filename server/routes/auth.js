require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const username = user.username;
      const token = jwt.sign(user.toJSON(), process.env.Secret);

      res.cookie("userLogin", token, { httpOnly: true });
      return res.json({ username });
    });
  })(req, res);
});

router.post("/logout", function (req, res, next) {
  res.clearCookie('userLogin')
  res.end()
});


module.exports = router;
