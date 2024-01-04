const { Console } = require("console");

const fs = require("fs").promises;

function readFromFile(name) {
  return new Promise(function (resolve) {
    resolve(fs.readFile(name, "utf8"));
  });
}

function writeToFile(data, name) {
  return new Promise(function (resolve) {
    resolve(fs.writeFile(name, data));
  });
}

async function fileCleaner() {
  const result = await readFromFile("file.txt");
  console.log(result);
  result_update = result.replace(/ +/g, " ");
  await writeToFile(result_update, "file1.txt");
  const result_after = await readFromFile("file1.txt");
  console.log(result_after);
}
fileCleaner();

// (async () => {
//   try {
//     const result = await fs.readFile("file.txt", "utf8");
//     console.log(result);
//   } catch (e) {
//     console.error(e);
//   }
// })();
