const router = require("express").Router();
let User = require("../models/user.model");

// GET ALL USERS
router.get("/", (req, res) => {
  User.find()
    .populate("cart.item", "name price img")
    .then(users => res.json(users))
    .catch(error => res.status(400).json({ msg: error }));
});

// GET ONE SPECIFIC USER
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("cart.item", "name price img")
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ msg: error }));
});

// ADD NEW USER
router.post("/add", (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ msg: error }));
});

// UPDATE USER
router.patch("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    username: req.body.username
  })
    .then(() => res.json("User Updated"))
    .catch(error => res.status(400).json({ msg: error }));
});

// DELETE USER
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch(error => res.status(400).json({ msg: error }));
});

module.exports = router;
