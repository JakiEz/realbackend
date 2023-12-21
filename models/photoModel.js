const mongoose = require("mongoose");
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
});

mongoose.model("Photo", PhotoSchema);
