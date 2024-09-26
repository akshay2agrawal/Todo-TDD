import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../Services/todos.service';
import { Todo } from '../../Services/Models/Todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-display-todos',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, FormsModule],
  templateUrl: './display-todos.component.html',
  styleUrl: './display-todos.component.css',
})
export class DisplayTodosComponent implements OnInit {
  todos!: Todo[];
  newTodo!: string;
  constructor(private todosService: TodosService) {}

  async ngOnInit() {
    this.todos = await this.todosService.getTodos();
    console.log(`Display Todos Component ngOnInit: \n `, this.todos);
  }

  async handleAddTodo() {
    console.log('add todo clicked!');
    this.todos = await this.todosService.getTodos();
    const todo = {
      id: this.todos.length + 1,
      title: this.newTodo,
      active: true,
    };
    console.log(this.todos, 'todo:', todo);
    let response = await this.todosService.addTodo(todo);
    this.updateTodos(true);
    this.newTodo = '';
  }

  async updateTodos(change: boolean) {
    if (change) this.todos = await this.todosService.getTodos();
  }
}
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
