import { Routes } from '@angular/router';
import { DisplayTodosComponent } from './Features/Todo/Components/display-todos/display-todos.component';
import { DisplayTodoDetailComponent } from './Features/Todo/Components/display-todo-detail/display-todo-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  {
    path: 'todo',
    loadChildren: () =>
      import('./Features/Todo/Modules/todo.module').then((m) => m.TodoModule),
  },
  { path: '**', redirectTo: '/todo' },
];
