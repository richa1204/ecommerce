const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductInCartModel = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const OrderModel = new mongoose.Schema(
  {
    products: [ProductInCartModel],
    transaction_id: {},
    amount: { type: Number },
    address: { type: String },
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Recieved"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductInCart = mongoose.model("ProductInCart", ProductInCartModel);
const Order = mongoose.model("Order", OrderModel);

module.exports = { Order, ProductInCart };