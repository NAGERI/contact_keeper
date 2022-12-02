const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();

// Initialize Middleware
app.use(express.json({ extended: false }));

// Extra security packages
// const helmet = require("helmet");
const cors = require("cors");
// const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.get("/", (req, res) => {
  res.json({ msg: "Hello World from server" });
});
app.use("/api/v0/users", require("./routes/users"));
app.use("/api/v0/auth", require("./routes/auth"));
app.use("/api/v0/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  try {
    connectDB(process.env.MONGODB_URI);
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});
