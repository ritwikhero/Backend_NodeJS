const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys;
  const kidneyLength = kidneys.length;

  return res.send("You have " + kidneyLength + " kidneys");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
