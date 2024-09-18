import { Injectable } from '@angular/core';
import { Todo } from '../Models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos!: Todo[];

  constructor() {
    this.todos = [
      {
        title: 'Buy groceries',
        active: true,
      },
      {
        title: 'Do laundry',
        active: true,
      },
      {
        title: 'Finish homework',
        active: true,
      },
      {
        title: 'Meet with friends',
        active: true,
      },
      {
        title: 'Clean the house',
        active: true,
      },
    ];
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}
