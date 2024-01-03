const express = require("express");
const mongoose = require("mongoose");
const IMU = require('../models/imuModel');

module.exports = (app) => {
  app.post("/formula/imu/send", async (req, res) => {
    try {
      
      const imuData = new IMU(req.body);
      await imuData.save();
      
      res.status(200).send("Data have been saved");
    } catch (e) {
      
      res.status(500).send(e.message);
    }
  });
};