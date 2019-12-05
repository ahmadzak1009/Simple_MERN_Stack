const router = require("express").Router();
let User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json({ msg: error }));
});

router.post("/add", (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ msg: error }));
});

module.exports = router;
