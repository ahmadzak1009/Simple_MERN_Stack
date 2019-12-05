const router = require("express").Router();
let Shirt = require("../models/shirt.model");

// GET ALL SHIRT
router.get("/", (req, res) => {
  Shirt.find()
    .then(shirts => res.json(shirts))
    .catch(error => res.status(400).json({ msg: error }));
});

// GET ONE SHIRT
router.get("/:id", (req, res) => {
  Shirt.findById(req.params.id)
    .then(shirt => res.json(shirt))
    .catch(error => res.status(400).json({ msg: error }));
});

// ADD NEW SHIRT
router.post("/add", (req, res) => {
  const newShirt = new Shirt({
    name: req.body.name,
    price: Number(req.body.price),
    colors: req.body.colors,
    sizes: req.body.sizes,
    img: req.body.img,
    stock: Number(req.body.stock)
  });

  newShirt
    .save()
    .then(shirt => res.json(shirt))
    .catch(error => res.json({ msg: error }));
});

// UPDATE SHIRT
router.patch("/:id", (req, res) => {
  Shirt.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: Number(req.body.price),
    colors: req.body.colors,
    sizes: req.body.sizes,
    img: req.body.img,
    stock: Number(req.body.stock)
  })
    .then(() => res.json("Shirt Updated"))
    .catch(error => res.status(400).json({ msg: error }));
});

// DELETE SHIRT
router.delete("/:id", (req, res) => {
  Shirt.findByIdAndDelete(req.params.id)
    .then(() => res.json("Shirt Deleted"))
    .then(error => res.status(400).json({ msg: error }));
});

module.exports = router;
