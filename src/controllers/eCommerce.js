const orderedProduct = require("../models/product");
const product = require("../models/product");

exports.getPosts = (req, res, next) => {
  // return an array of posts
  // res.set("Access-Control-Allow-Origin", "*");
  product.find().then((subject) => {
    res.json({
      message: "All products",
      posts: subject,
    });
  });
};

exports.getOrders = (req, res, next) => {
  // return an array of posts
  // res.set("Access-Control-Allow-Origin", "*");
  orderedProduct.find().then((subject) => {
    res.json({
      message: "All Orders",
      posts: subject,
    });
  });
};

exports.createLessons = (req, res, next) => {
  console.log("from client", req);
  res.set("Access-Control-Allow-Origin", "*");
  const topic = req.body.topic;
  const location = req.body.location;
  const price = req.body.price;
  const space = req.body.space;
  const name = req.body.name;
  // create a new product instance
  const subjectProduct = new product({
    name: name,
    topic: topic,
    location: location,
    price: price,
    space: space,
  });
  product.create(subjectProduct);
  return res.json({ data: "Product Added successfully!" });
};

exports.createOrder = async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  const userIds = req.body.productSelected;
  let productsToOrder = [];

  for (let i = 0; i < userIds.length; i++) {
    const products = await product.findById(userIds[i]);
    console.log(products);
    if (products && products.space < userIds[i].space) {
      res.status(400).send({
        message: products.space
          ? `the product ${products.name} is only ${products.space}`
          : `the product ${products.name} is out of Stock`,
      });
      return;
    }
    productsToOrder.push(products);
  }
  orderedProduct.create(productsToOrder)
  res.send({
    message: "Product booked successfully",
    productsOrdered: productsToOrder,
  });
};

//Update product
exports.updateLessons = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
      res.send("Done");
    }
  );
};

//delete lessons
exports.deleteLessons = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  product.findByIdAndDelete(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("deleted: " + result);
    res.send("Deleted");
  });
};
