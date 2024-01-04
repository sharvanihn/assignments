const fs = require("fs");
fs.readFile("file.txt", "utf-8", function (err, data) {
  console.log(data);
});

console.log("Hello World");

let ans = 0;
for (let index = 0; index < 1000000000; index++) {
  ans += index;
}
console.log(1);
