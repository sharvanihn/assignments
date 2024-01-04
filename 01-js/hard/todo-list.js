/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todo = [];
  }

  add(val) {
    this.todo.push(val);
  }

  remove(idx) {
    // const abc = this.todo.filter((letter, index) => {
    //   return index != idx;
    // });
    // this.todo = abc;

    this.todo.splice(idx, 1);
  }

  update(idx, val) {
    if (idx < this.todo.length) {
      this.todo[idx] = val;
    }
  }

  get(idx) {
    if (idx < this.todo.length) {
    return this.todo[idx];
    }else return null
  }

  getAll() {
    return this.todo;
  }

  clear() {
    this.todo = [];
  }
}

module.exports = Todo;
