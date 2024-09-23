import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { DisplayTodosComponent } from './Features/Todo/Components/display-todos/display-todos.component';
import { FormsModule } from '@angular/forms';
import { TodoModule } from './Features/Todo/Modules/todo.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DisplayTodosComponent,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TodoModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-todo-app';
}
