require("dotenv").config();
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  };

app.use(express.json())
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for models
require('./models/userModels')

//for routes
require('./routes/userRoute')(app);
//dwa
//for mongodb connections
mongoose.connect(process.env.mongoURI, {useNewUrlParser: true});

        
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})
