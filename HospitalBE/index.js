const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const users = [
  {
    fullName: "rohit",
    kidney: [
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const kidney = users[0].kidney;
  console.log(kidney);
  const noOfKidney = kidney.length;
  console.log(noOfKidney);

  const healthyKidney = kidney.filter((kidney) => kidney.healthy === true);
  const noOfHealthyKidney = healthyKidney.length;

  const unhealthyKidney = noOfKidney - noOfHealthyKidney;

  res.json({ noOfKidney, noOfHealthyKidney, unhealthyKidney });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;

  users[0].kidney.push({
    healthy: isHealthy,
  });

  res.json({ message: "done" });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidney.length; i++) {
    users[0].kidney[i].healthy = false;
  }
  res.json({ message: "done" });
});

app.delete("/", (req, res) => {
  users[0].kidney.pop();
  res.json({ message: "done" });
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
