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

  ngOnInit() {
    this.todos = this.todosService.getTodos();
  }

  handleAddTodo() {
    const todo = {
      id: this.todosService.getTodos().length + 1,
      title: this.newTodo,
      active: true,
    };
    let response = this.todosService.addTodo(todo);
    this.newTodo = '';
  }
}
