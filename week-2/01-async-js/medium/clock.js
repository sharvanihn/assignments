// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

let counter = 0;
function printCounter() {
  let currentDate = new Date();
  counter++;
  console.log(currentDate.toLocaleTimeString().slice(0, 8));
  console.log(currentDate.toLocaleTimeString());
  if (counter <= 10) {
    setTimeout(printCounter, 1000);
  }
}

printCounter();
