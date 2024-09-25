import { Injectable } from '@angular/core';
import { Todo } from './Models/Todo';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../../server/server.ts';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: Todo[] = [];

  constructor() {}

  async getTodos(): Promise<Todo[]> {
    try {
      const response = await client.getTodo.query();
      this.todos = response; // Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }
    return this.todos;
  }

  async deleteTodo(todo: Todo): Promise<Boolean> {
    console.log('>inside deleteTodo');
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index === -1) {
      return false;
    }

    // this.todos.splice(index, 1);
    // this.todos.map((todo, index) => {
    //   todo.id = index;
    // });
    try {
      const response = await client.getTodo.query();
      this.todos = response; //Assign fetched todos to the array
    } catch (error) {
      console.error('Error fetching todos:', error); // Handle any errors
    }

    console.log(this.todos);
    return true;
  }

  addTodo(todo: Todo): Todo[] | Boolean {
    console.log('addtodo called');
    console.log(todo);
    const exists = this.todos.some((obj) => obj.id === todo.id);

    if (exists) return false;

    this.todos.push(todo);
    console.log(this.todos);
    return this.todos;
  }

  changeActive(todo: Todo): Todo | Boolean {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index === -1) return false;

    this.todos[index].active = !this.todos[index].active;
    return this.todos[index];
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  // async fetchTodos(): Promise<void> {
  //   try {
  //     const response = await client.hello.query();
  //     this.todos = response; // Assign fetched todos to the array
  //   } catch (error) {
  //     console.error('Error fetching todos:', error); // Handle any errors
  //   }
  // }
}

// Create a tRPC client
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});
