const express = require("express");
const Cart = require("../models/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.use(auth);

router.post("/", async (req, res) => {
  const cartItem = new Cart(req.body);
  await cartItem.save();
  res.status(201).json(cartItem);
});

router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    // Check if cart item exists
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).send("Cart item not found");

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).send("Error updating cart item");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Check if cart item exists
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).send("Cart item not found");

    // Delete the cart item
    await cartItem.deleteOne();

    res.status(200).send("Cart item removed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

// Similar logic for PUT and DELETE
