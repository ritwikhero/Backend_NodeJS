const { log } = require("console");
const fs = require("fs");

fs.writeFile(
  "text.txt",
  "dekh ladle aaya hoon write wali assingment ke liye",
  (err, data) => {
    if (err) throw (err, console.log("File written", data));
  },
);
