const express = require("express");
const Product = require("../models/product");
const router = express.Router();

console.log("first");
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/add", async (req, res) => {
  const products = new Product(req.body);
  await products.save();
  res.status(201).json(products);
});

console.log("first");

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

console.log("first");

module.exports = router;
