import { Component, Input } from '@angular/core';
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
  todos!: Todo[];

  constructor(private todosService: TodosService, private router: Router) {
    // Constructor is used for dependency injection, avoid complex logic here
  }

  async ngOnInit() {
    this.todos = await this.todosService.getTodos();
  }

  handleDeleteClick(todo: Todo) {
    let retValue = this.todosService.deleteTodo(todo);
  }

  handleCheckBox(todo: Todo) {
    this.todosService.changeActive(todo);
  }

  goToTodoDetail() {
    this.router.navigate(['/todo', this.todo.id]); // Navigate to /todo/:id
  }
}
