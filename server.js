const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//dot env config
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

//db connection
connectDB();

///rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/v1/test", require("./routes/testRoutes"));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  return res.status(200).json("welcom");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started");
});
