const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");

module.exports = (app) => {
    app.get("/photo/getall",async (req,res) => {
        db.photos.find().sort({likes: -1}).limit(10)

    })
}