import knex from "knex";
import db from "../db/db";

interface Todo {
  title: string;
  active: boolean;
}

export class TodosController {
  async addTodo(todo: Todo): Promise<Todo[]> {
    return db("todos")
      .insert({
        title: todo.title,
        active: todo.active,
      })
      .returning("*"); // Return the inserted records
  }
}
