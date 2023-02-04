const express = require("express");
const lessonControlers = require("../controllers/eCommerce.js");
const router = express.Router();
const app = express();

const cors = require("cors");
app.use(cors());

//get lessons
router.get("/lessons", lessonControlers.getPosts);
router.get("/order", lessonControlers.getOrders);

//create lessons
router.post("/lessons", lessonControlers.createLessons);
router.post("/order", lessonControlers.createOrder);

//update lessons
router.put("/lessons/:id", lessonControlers.updateLessons);

//delete lessons
router.delete("/lessons/:id", lessonControlers.deleteLessons);

module.exports = router;