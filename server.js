require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;

app.use(express.json())

//for models
require('./models/userModels')

//for routes
require('./routes/userRoute')(app);

//for mongodb connections
mongoose.connect(process.env.mongoURI, {useNewUrlParser: true});

        
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})
