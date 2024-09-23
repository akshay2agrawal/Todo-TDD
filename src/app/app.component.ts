import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TodoModule } from './Features/Todo/Modules/todo.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-todo-app';
}
