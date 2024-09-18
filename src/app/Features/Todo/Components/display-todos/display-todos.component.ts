import { Component } from '@angular/core';
import { TodosService } from '../../Services/todos.service';
import { Todo } from '../../Services/Models/Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-todos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-todos.component.html',
  styleUrl: './display-todos.component.css',
})
export class DisplayTodosComponent {
  todos!: Todo[];

  constructor(private todosService: TodosService) {
    this.todos = this.todosService.getTodos();
  }
}
