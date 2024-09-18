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
    return this.todos;
  }
}
