const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hi", (req, res) => {
  res.send("Hello there!");
});

app.post("/conversation", (req, res) => {
  console.log(req.body);
  res.send({
    msg: "ka re kaisan ba",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
