const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Title"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Please Enter Description"],
    },
    img: { type: String, required: [true, "Please Enter Image Link"] },
    trailer: { type: String, required: [true, "Please Enter Trailer"] },
    video: { type: String, required: [true, "Please Enter Video"] },
    year: { type: String, required: [true, "Please Enter Year"] },
    duration: { type: String, required: [true, "Please Enter Duration"] },
    limit: { type: Number, required: [true, "Please Enter Limit"] },
    genre: { type: String, required: [true, "Please Enter Genre"] },
    isSeries: {
      type: Boolean,
      required: [true, "Please Enter isSeries?"],
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
