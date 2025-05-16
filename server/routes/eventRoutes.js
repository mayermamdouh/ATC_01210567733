const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const multer = require("multer");
const AppError = require("../utils/AppError");
const verifyToken = require("../middlewares/verfiyToken");
const allowTo = require("../middlewares/allowTo.js");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("file: ", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `event-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilterr = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(AppError.create("file must be an image", 400), false);
  }
};
const uploadd = multer({ storage: diskStorage, fileFilter: fileFilterr });

router
  .route("/")
  .post(
    verifyToken,
    allowTo("ADMIN"),
    uploadd.single("photo"),
    eventController.addEvent
  )
  .get(eventController.getAllEvent);

router
  .route("/:id")
  .get(eventController.getSingleEvent)
  .delete(verifyToken, allowTo("ADMIN"), eventController.deleteEvent)
  .patch(
    verifyToken,
    allowTo("ADMIN"),
    uploadd.single("photo"),
    eventController.updateEvent
  );

module.exports = router;
