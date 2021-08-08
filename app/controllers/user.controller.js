const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.users;

exports.signUp = (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(401).send({ message: "Email or password cannot be empty." });
    return;
  }

  const email = req.body.email;
  const filter = { email: email };

  // find user based on the email ID provided in API request
  User.findOne(filter, (err, user) => {
    if (err || user === null) {
      // if email ID does not already exists, create a new user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: email,
        password: hash,
        role: req.body.role ? req.body.role : "user",
        isLoggedIn: true,
      });

      // save newly created user in the database
      user
        .save(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Something went wrong. Please try again.",
          });
        });
    } else {
      // email ID already exists, send an error
      res.status(409).send({
        message: "User Already Exists.",
      });
    }
  });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validate request
  if (!email && !password) {
    res.status(401).send({ message: "Email or password cannot be empty." });
    return;
  }

  const filter = { email: email };
  User.findOne(filter, (err, user) => {
    if (err || user === null) {
      res.status(401).send({
        message: "Incorrect email or password.",
      });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        user.isLoggedIn = true;

        User.findOneAndUpdate(filter, user, { useFindAndModify: false })
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: "User data not found!",
              });
            } else {
              const token = jwt.sign({ _id: data._id }, "myprivatekey");
              data.token = token;
              res.send(data);
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Something went wrong. Please try again.",
            });
          });
      } else {
        res.status(401).send({
          message: "Incorrect email or password.",
        });
      }
    }
  });
};

exports.logout = (req, res) => {
  if (!req.body.id) {
    res
      .status(401)
      .send({ message: "Please provide User ID for logging out." });
    return;
  }

  const id = req.body.id;
  const update = { isLoggedIn: false };

  User.findByIdAndUpdate(id, update)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "User data not found!",
        });
      } else res.send({ message: "Logged out successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong. Please try again.",
      });
    });
};
