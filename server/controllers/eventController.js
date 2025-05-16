const Event = require("../models/eventModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
const AppError = require("../utils/AppError");
const fs = require("fs");
const path = require("path");

const addEvent = asyncWrapper(async (req, res, next) => {
  try {
    if (req.file) {
      req.body.photo = req.file.filename;
    }

    const newEvent = new Event(req.body);
    await newEvent.save();

    res.status(201).json({ status: "success", data: { data: newEvent } });
  } catch (err) {
    console.error("Add event error:", err);
    res.status(500).json({ status: "fail", message: err.message });
  }
});

const deleteEvent = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const event = await Event.findById(id);

  if (!event) {
    return next(AppError.create("Event not found", 404));
  }

  const filePath = path.join(__dirname, "..", "uploads", event.photo);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist or has already been deleted:", err);
      return next(AppError.create("File not found", 404));
    }

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Failed to delete the file:", err);
        return next(
          AppError.create("Failed to delete the associated file", 500)
        );
      }

      await Event.deleteOne({ _id: id });
      res.status(200).json({ status: "success", data: null });
    });
  });
});

const updateEvent = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  if (!event) {
    return next(AppError.create("Event not found", 404));
  }

  const updateFields = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    date: req.body.date,
    venue: req.body.venue,
    price: req.body.price,
    tags: req.body.tags,
  };

  if (req.file) {
    if (event.photo) {
      const oldPhotoPath = path.join(__dirname, "../uploads", event.photo);
      try {
        fs.unlinkSync(oldPhotoPath);
        // console.log("Old photo deleted successfully.");
      } catch (err) {
        console.error("Error deleting old photo:", err);
      }
    }

    updateFields.photo = req.file.filename;
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  res.status(200).json({ status: "success", data: { event: updatedEvent } });
});

const getSingleEvent = asyncWrapper(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    const error = AppError.create("not found event", 404, "fail");
    return next(error);
  }
  return res.status(200).json({ status: "success", data: { event } });
});

const getAllEvent = asyncWrapper(async (req, res, next) => {
  const events = await Event.find({});
  res.status(200).json({ status: "success", data: { events } });
});

module.exports = {
  addEvent,
  deleteEvent,
  updateEvent,
  getSingleEvent,
  getAllEvent,
};
