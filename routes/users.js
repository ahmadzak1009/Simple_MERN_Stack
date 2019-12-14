const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../validation");
const verify = require("./verifyUserToken");

// GET ALL USERS
router.get("/", verify, (req, res) => {
  User.find()
    .populate("cart.item", "name price img")
    .then(users => res.json(users))
    .catch(error => res.status(400).json({ msg: error }));
});

// GET ONE SPECIFIC USER
router.get("/:id", verify, (req, res) => {
  User.findById(req.params.id)
    .populate("cart.item", "name price img")
    .then(user => res.json(user))
    .catch(error => res.status(400).json({ msg: error }));
});

// ADD NEW USER
router.post("/add", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cekUsername = await User.findOne({ username: req.body.username });
  if (cekUsername) return res.status(400).send("username already exist");

  const cekEmail = await User.findOne({ email: req.body.email });
  if (cekEmail) return res.status(400).send("email already exist");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cart: []
  });

  try {
    const result = await newUser.save();
    return res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE USER
router.delete("/:id", verify, async (req, res) => {
  try {
    const findOne = await User.findByIdAndDelete(req.params.id);
    if (findOne) return res.send("User Deleted");
  } catch (err) {
    res.status(400).send(err);
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const findOne = await User.findOne({ username: req.body.username });
    if (!findOne) return res.status(400).send("username does not exist");

    const cekPassword = await bcrypt.compare(req.body.password, findOne.password);
    if (!cekPassword) return res.status(400).send("password incorrect");

    const token = jwt.sign({ _id: findOne.password }, process.env.USER_KEY, { expiresIn: "1h" });
    return res.header("user-token", token).json({ token, id: findOne._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
