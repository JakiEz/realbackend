const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/user/create", async (req, res) => {
    const saltRounds = 10;
    try {
      const { email, username, password, phone } = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }, { phone }],
      });

      if (existingUser) {
        const duplicateFields = [];
        if (existingUser.email === email) {
          duplicateFields.push("email");
        }
        if (existingUser.username === username) {
          duplicateFields.push("username");
        }
        if (existingUser.phone === phone) {
          duplicateFields.push("phone");
        }

        return res
          .status(400)
          .json({ error: `Duplicate fields: ${duplicateFields.join(", ")}` });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        phone,
      });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid email or password" });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await User.find({});

      if (!users) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({ message: "Fetch successful", users });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred during fetching users" });
    }
  });
};
