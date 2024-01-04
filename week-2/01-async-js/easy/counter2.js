counter = 0;
function printCounter() {
  console.log(counter++);
  if (counter <= 10) {
    setTimeout(printCounter, 1000);
  }
}

printCounter();
