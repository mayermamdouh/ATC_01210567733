const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongooDB succefully");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/bookings", bookingRouter);



app.use((error, res) => {
  res.status(error.statusCode || 500).json({
    ststus: error.statusText,
    message: error.message,
    code: error.statusCode || 500,
  });
});



app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
