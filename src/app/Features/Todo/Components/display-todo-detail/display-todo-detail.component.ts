import { Component } from '@angular/core';
import { TodosService } from '../../Services/todos.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../../Services/Models/Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-todo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-todo-detail.component.html',
  styleUrl: './display-todo-detail.component.css',
})
export class DisplayTodoDetailComponent {
  todo!: Todo | undefined;
  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService // Inject TodosService to fetch todo data
  ) {}
  ngOnInit(): void {
    // Access the ID from the route
    const id = +this.route.snapshot.paramMap.get('id')!; // Convert the 'id' to a number
    // Fetch the Todo item by its ID
    this.todo = this.todosService.getTodoById(id);
  }
}
