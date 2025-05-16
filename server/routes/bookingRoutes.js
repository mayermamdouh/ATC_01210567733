const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const verifyToken = require("../middlewares/verfiyToken");

router
  .route("/:id")
  .post(verifyToken, bookingController.bookingEvent)
  .get(verifyToken, bookingController.getBooking);

module.exports = router;
