const fs = require("fs");

let data = "This is a file containing a collection of books.";

fs.writeFile("books.txt", data, (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync("books.txt", "utf8"));
  }
});

console.log("Hello World");

let ans = 0;
for (let index = 0; index < 10000000000; index++) {
  ans += index;
}
console.log(1);
