import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../Services/Models/Todo';
import { TodosService } from '../../Services/todos.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  todos!: Todo[];

  constructor(private todosService: TodosService, private router: Router) {
    // Constructor is used for dependency injection, avoid complex logic here
  }

  async ngOnInit() {
    this.todos = await this.todosService.getTodos();
  }

  async handleDeleteClick(todo: Todo) {
    let retValue = await this.todosService.deleteTodo(todo);
    this.change.emit(true);
  }

  handleCheckBox(todo: Todo) {
    this.todosService.changeActive(todo);
    this.change.emit(true);
  }

  goToTodoDetail() {
    this.router.navigate(['/todo', this.todo.id]); // Navigate to /todo/:id
  }
}
