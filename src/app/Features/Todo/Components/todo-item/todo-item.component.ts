import { Component, Input } from '@angular/core';
import { Todo } from '../../Services/Models/Todo';
import { TodosService } from '../../Services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(todosService: TodosService) {}
}
