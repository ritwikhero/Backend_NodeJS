const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

// app.use("/api", require("/routes/user"));
// app.use("/api", require("/routes/user"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
