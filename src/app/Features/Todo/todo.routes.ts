import { RouterModule, Routes } from '@angular/router';
import { DisplayTodosComponent } from './Components/display-todos/display-todos.component';
import { DisplayTodoDetailComponent } from './Components/display-todo-detail/display-todo-detail.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: DisplayTodosComponent },
  { path: ':id', component: DisplayTodoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
