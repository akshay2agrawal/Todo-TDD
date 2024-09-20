import { Injectable } from '@angular/core';
import { Todo } from './Models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos!: Todo[];

  constructor() {
    this.todos = [
      { id: 1, title: 'Buy groceries', active: true },
      { id: 2, title: 'Do laundry', active: true },
      { id: 3, title: 'Finish homework', active: true },
      { id: 4, title: 'Meet with friends', active: true },
      { id: 5, title: 'Clean the house', active: true },
    ];
  }

  getTodos(): Todo[] {
    console.log('>inside getTodos');
    return this.todos;
  }

  deleteTodo(todo: Todo): Boolean {
    console.log('>inside deleteTodo');
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      return false;
    }

    this.todos.splice(index, 1);
    console.log(this.todos);
    return true;
  }

  addTodo(todo: Todo): Todo[] | Boolean {
    console.log('addtodo called');
    console.log(todo);
    const exists = this.todos.some((obj) => obj.id === todo.id);

    if (exists) return false;

    this.todos.unshift(todo);
    return this.todos;
  }

  changeActive(todo: Todo): Todo | Boolean {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index === -1) return false;

    this.todos[index].active = !this.todos[index].active;
    return this.todos[index];
  }
}
