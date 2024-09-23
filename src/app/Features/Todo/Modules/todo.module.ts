import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoRoutingModule } from '../todo.routes';
@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, TodoRoutingModule],
})
export class TodoModule {}
