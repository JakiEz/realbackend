const express = require("express");
const router = express.Router();
const multer = require("multer");
const Photo = require("../models/photoModel");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const upload = multer({ storage: storage });

// Route for uploading a photo
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

module.exports = (app) => {
  app.post("/uploadImage'", upload.array("image"), async (req, res) => {
    try {
      console.log(req.file); 
      return res.status(200).send("Done");
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
