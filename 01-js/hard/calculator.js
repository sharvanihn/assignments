/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a) {
    this.result = this.result + a;
  }

  subtract(a) {
    this.result = this.result - a;
  }

  multiply(a) {
    this.result = this.result * a;
  }

  divide(a) {
    if (a === 0) {
      throw new Error("Error: Division by zero is not allowed.");
    }
    this.result = this.result / a;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    expression = expression.replace(/\s/g, "");
    if (!/^[0-9\s\+\-\*/\(\)]+$/.test(expression)) {
      throw new Error("Invalid characters in the expression.");
    }
    this.result = this.helper(Array.from(expression), 0);
  }
  helper(s, idx) {
    var stk = [];
    let sign = "+";
    let num = 0;
    for (let i = idx; i < s.length; i++) {
      let c = s[i];
      if (c >= "0" && c <= "9") {
        num = num * 10 + (c - "0");
      }
      if (!(c >= "0" && c <= "9") || i === s.length - 1) {
        if (c === "(") {
          num = this.helper(s, i + 1);
          let l = 1,
            r = 0;
          for (let j = i + 1; j < s.length; j++) {
            if (s[j] === ")") {
              r++;
              if (r === l) {
                i = j;
                break;
              }
            } else if (s[j] === "(") l++;
          }
        }
        let pre = -1;
        switch (sign) {
          case "+":
            stk.push(num);
            break;
          case "-":
            stk.push(num * -1);
            break;
          case "*":
            pre = stk.pop();
            stk.push(pre * num);
            break;
          case "/":
            pre = stk.pop();
            if (num === 0) {
              throw new Error("Error: Division by zero is not allowed.");
            }
            stk.push(pre / num);
            break;
        }
        sign = c;
        num = 0;
        if (c === ")") break;
      }
    }
    let ans = 0;
    while (stk.length > 0) {
      ans += stk.pop();
    }
    return ans;
  }
  
}

module.exports = Calculator;
