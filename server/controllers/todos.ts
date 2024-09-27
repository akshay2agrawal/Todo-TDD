import knex from 'knex';
import db from '../db/db';

interface Todo {
  title: string;
  active: boolean;
}

export class TodosController {
  async addTodo(todo: Todo): Promise<Todo[]> {
    return db('todos')
      .insert({
        title: todo.title,
        active: todo.active,
      })
      .returning('*'); // Return the inserted records
  }

  async deleteTodo(todo: Todo) {
    db('todos').where('title', todo.title).del();
  }

  async getTodos() {
    return db('todos').select();
  }

  async changeActive(todo: Todo) {
    console.log('active: ', todo.active);
    await db('todos').where('title', todo.title).update({
      active: !todo.active,
    });
  }

  async getTodoById(id: number) {
    return db('todos').where('id', id).select('id');
  }
}
