const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: Number,
  topic: String,
  location: String,
  price: Number,
  space: Number,
  name: String,
});

module.exports = mongoose.model("Product", postSchema);


const orderedProductSchema = new Schema({
  id: Number,
  topic: String,
  location: String,
  price: Number,
  space: Number,
  name: String,
});

module.exports = mongoose.model("OrderedProduct", orderedProductSchema);