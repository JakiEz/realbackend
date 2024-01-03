const mongoose = require("mongoose");
const { Schema } = mongoose;

const imuSchema = new Schema(
  {
    Acceleration: {
      X: { type: Number, required: true },
      Y: { type: Number, required: true },
      Z: { type: Number, required: true },
    },
    Rotation: {
      X: { type: Number, required: true },
      Y: { type: Number, required: true },
      Z: { type: Number, required: true },
    },
    Temperature: { type: Number, required: true },
  },
  {
    timestamps: true, // this should be outside the object
  }
);

module.exports = mongoose.model('Imu', imuSchema);