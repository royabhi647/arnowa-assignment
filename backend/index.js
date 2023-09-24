const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

const PORT = process.env.PORT || 8080;

// mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

// login schema
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  mobileNo: String,
  time: String,
});

// login model
const userModel = mongoose.model("user", userSchema);

//API
app.get("/", (req, res) => {
  res.send("server is running");
});

// login api
app.post("/login", async (req, res) => {
  const { name, email, mobileNo, time } = req.body;
  const existingUser = await userModel.findOne({ email: email });
  try {
    if (
      name === process.env.NAME &&
      email === process.env.EMAIL &&
      mobileNo === process.env.MOBILE
    ) {
      const allUsers = await userModel.find();
      res.send({ message: "All Users Details", allUsers });
    } else if (existingUser) {
      res.send({
        message: "User with this email already exists",
        alert: true,
        data: existingUser,
      });
    } else {
      const data = userModel({ name, email, mobileNo, time });
      const save = await data.save();
      res.send({ message: "Successfully logged in", alert: true, data: save });
    }
  } catch (err) {
    res.send({ message: "some issues occurs" });
  }
});

// details api
app.get("/details", async (req, res) => {});

app.listen(PORT, () => {
  console.log("server is running at port : " + PORT);
});
