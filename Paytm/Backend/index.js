const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user");
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api/user", userRouter);
// app.use("/api", require("/routes/user"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
