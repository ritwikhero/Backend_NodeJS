const fs = require("fs");

fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log("File Data:", data);
});

let sum = 0;
for (let i = 0; i < 5e9; i++) {
  sum += i;
}
console.log("Expensive task done");
