const router = require("express").Router();
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const { addAdminValidation } = require("../validation");

router.get("/", verify, (req, res) => {
  Admin.find()
    .sort("-createdAt")
    .then(admin => res.json(admin))
    .catch(err => res.json({ msg: err }));
});

router.get("/:id", verify, (req, res) => {
  Admin.findOne({ _id: req.params.id })
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json({ msg: err }));
});

router.post("/", verify, (req, res) => {
  const { error } = addAdminValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) throw err;

    const newAdmin = new Admin({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    newAdmin
      .save()
      .then(admin => res.json({ admin: admin._id }))
      .catch(err => res.status(400).json({ msg: err }));
  });
});

router.post("/login", (req, res) => {
  Admin.findOne({ username: req.body.username })
    .then(user => {
      if (user.length !== 0) {
        bcrypt.compare(req.body.password, user.password).then(match => {
          if (match) {
            const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "1h" });
            res.header("auth-token", token).json({ token, id: user._id });
          } else {
            res.status(400).json({ msg: "Incorrect Password" });
          }
        });
      } else {
        res.status(400).send("username tidak ditemukan");
      }
    })
    .catch(() => res.status(400).send("username tidak ditemukan"));
});

module.exports = router;
