const Booking = require("../models/bookingModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
// const AppError = require("../utils/AppError");

const bookingEvent = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  let booking = await Booking.findOne({ user: userId, event: id });

  if (booking) {
    booking.tickets += 1;
    await booking.save();
  } else {
    booking = new Booking({ user: userId, event: id });
    await booking.save();
  }

  res.status(201).json({
    status: "success",
    data: { booking: booking },
  });
});

const getBooking = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const bookings = await Booking.find({ user: id }).populate("event");
  res.status(200).json({ status: "success", data: { bookings } });
});

module.exports = {
  bookingEvent,
  getBooking,
};
