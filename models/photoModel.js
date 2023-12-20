const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: String,
  caption: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Photo", photoSchema);
