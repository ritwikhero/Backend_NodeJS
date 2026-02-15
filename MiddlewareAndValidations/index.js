const express = require("express");
const zod = require("zod");
const app = express();
const PORT = 3000;
// const schema = zod.array(zod.number());

const schema = zod.object({
  email: zod.email(),
  password: zod.password(),
  kidneys: zod.array(zod.number()),
  country: zod.literal("IN").or(zod.literal("US")),
});

app.use(express.json());

app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  // const kidneyLength = kidneys.length;

  // return res.send("You have " + kidneyLength + " kidneys");
  return res.send({ response });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
