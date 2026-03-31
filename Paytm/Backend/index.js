const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
