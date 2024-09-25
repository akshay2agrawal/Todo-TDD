import { Injectable } from '@angular/core';
import { Todo } from './Models/Todo';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../../server/server';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: Todo[] = [];

  constructor() {}

  async getTodos(): Promise<Todo[]> {
    try {
      const response = await client.getTodo.query();
      console.log(response);
      this.todos = response; // Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }
    return this.todos;
  }

  async deleteTodo(todo: Todo): Promise<Boolean> {
    console.log('>inside deleteTodo', todo);
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      return false;
    }
    try {
      const response = await client.deleteTodo.mutate(todo);
      this.todos = response; //Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }

    console.log(this.todos);
    return true;
  }

  async addTodo(todo: Todo): Promise<Boolean | Todo[]> {
    console.log('addtodo called');
    console.log(todo);
    const exists = this.todos.some((obj) => obj.id === todo.id);

    if (exists) return false;

    try {
      const response = await client.addTodo.mutate(todo);
      this.todos = response; //Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }
    console.log(this.todos);
    return this.todos;
  }

  async changeActive(todo: Todo): Promise<Boolean | Todo> {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index === -1) return false;

    // this.todos[index].active = !this.todos[index].active;

    try {
      const response = await client.changeActive.mutate(todo);
      this.todos = response; //Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }
    return this.todos[index];
  }

  async getTodoById(id: number): Promise<Todo | undefined> {
    try {
      const response = await client.getTodoById.query({ id });
      //Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }

    return this.todos.find((todo) => todo.id === id);
  }
}

// Create a tRPC client
export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});
