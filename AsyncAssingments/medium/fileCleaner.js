const fs = require("fs/promises");

// let fileData = "";

// fs.readFile("file.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   fileData = data;
//   console.log(data);
// });

// async function getFileData() {
//   let fileData = "";

//   fs.readFile("file.txt", "utf-8", (err, data) => {
//     if (err) throw err;
//     fileData = data;
//     console.log(data);
//   });

//   return fileData;
// }

// const fileData = getFileData();
// console.log;

async function cleanFile(filePath) {
  let content = await fs.readFile(filePath, "utf8");
  let cleanedContent = content.split(/\s+/).join(" ");
  await fs.writeFile(filePath, cleanedContent);
  console.log("File cleaned successfully!");
}

cleanFile("file.txt");
