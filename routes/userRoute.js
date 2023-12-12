const mongoose = require("mongoose");
const User = mongoose.model('User');


module.exports = (app) => {
  app.post("/user/create", async (req, res) => {
    try {
      const { email, username, password } = req.body;

      // Check if the email or username is already registered
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        const duplicateFields = [];
        if (existingUser.email === email) {
          duplicateFields.push('email');
        }
        if (existingUser.username === username) {
          duplicateFields.push('username');
        }

        return res.status(400).json({ error: `Duplicate fields: ${duplicateFields.join(', ')}` });
      }

      // If the email and username are not registered, create a new user
      const newUser = new User({ email, username, password });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.put("/user/update",(req,res)=>{
    
  })
};


