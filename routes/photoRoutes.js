const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
const User = require('../models/User');
const multer = require('multer');
const upload = multer();

module.exports = (app) => {
    app.get("/photo/getall",async (req,res) => {
        db.photos.find().sort({likes: -1}).limit(10)

    });

    app.put('/updateProfile/:id',upload.single('profileImage'), async (req, res) => {
        try {
            const User = mongoose.model('User');
            const user = new User();
            user.profileImage = req.file.buffer;
            await user.save();
            res.send('Image uploaded successfully');
        } catch (err) {
            res.status(500).send(err);
        }
      });
      
}