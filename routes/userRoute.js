const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.post("/user/create", async (req, res) => {
    const saltRounds = 10;
    try {
      const { email, username, password } = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        const duplicateFields = [];
        if (existingUser.email === email) {
          duplicateFields.push("email");
        }
        if (existingUser.username === username) {
          duplicateFields.push("username");
        }

        return res
          .status(400)
          .json({ error: `Duplicate fields: ${duplicateFields.join(", ")}` });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();

      res.status(201)
      res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/user/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });
};
