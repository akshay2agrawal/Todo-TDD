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
  todos!: Todo[];

  constructor(private todosService: TodosService) {
    // Constructor is used for dependency injection, avoid complex logic here
  }

  ngOnInit() {
    this.todos = this.todosService.getTodos();
  }

  handleDeleteClick(todo: Todo) {
    this.todosService.deleteTodo(todo);
  }
}
