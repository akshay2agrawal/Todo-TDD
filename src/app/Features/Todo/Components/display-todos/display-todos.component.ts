import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../Services/todos.service';
import { Todo } from '../../Services/Models/Todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-display-todos',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './display-todos.component.html',
  styleUrl: './display-todos.component.css',
})
export class DisplayTodosComponent implements OnInit {
  todos!: Todo[];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos = this.todosService.getTodos();
  }
}
