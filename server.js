const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "Hello World from server" });
});
app.use("/api/v0/users", require("./routes/users"));
app.use("/api/v0/auth", require("./routes/auth"));
app.use("/api/v0/contacts", require("./routes/contacts"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
