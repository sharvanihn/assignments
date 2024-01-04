let a = 0;
let intervalId = null;
function printCounter() {
  if (a <= 10) {
    console.log(a++);
  } else {
    clearInterval(intervalId);
  }
}

intervalId = setInterval(printCounter, 1000);
