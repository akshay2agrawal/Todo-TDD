import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayTodosComponent } from './Features/Todo/Components/display-todos/display-todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DisplayTodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-todo-app';
}
