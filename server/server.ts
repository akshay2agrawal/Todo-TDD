// src/server.ts

import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { todo } from 'node:test';
import { input } from '@angular/core';
import { TodosController } from './controllers/todos';

import { title } from 'node:process';
import db from './db/db';
// Initialize tRPC
const t = initTRPC.create();

const todos = [
  { id: 1, title: 'Buy groceries', active: true },
  { id: 2, title: 'Do laundry', active: true },
  { id: 3, title: 'Finish homework', active: true },
  { id: 4, title: 'Meet with friends', active: true },
  { id: 5, title: 'Clean the house', active: true },
];
const todosController = new TodosController();

async function seedDb() {
  // Use the instance to call addTodo
  await db('todos').del();
  await db.raw('ALTER SEQUENCE todos_id_seq RESTART WITH 1');

  todos.forEach(async (todo) => {
    await todosController.addTodo({ title: todo.title, active: todo.active });
  });
  console.log('completed seeding');
}

seedDb();

// Define tRPC router with different procedures
const appRouter = t.router({
  getTodo: t.procedure.query(async () => {
    return todosController.getTodos();
  }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.number(), title: z.string(), active: z.boolean() }))
    .mutation(async ({ input }) => {
      return await db('todos').where('title', input.title).del().returning('*');
    }),
  addTodo: t.procedure
    .input(z.object({ id: z.number(), title: z.string(), active: z.boolean() }))
    .mutation(async ({ input }) => {
      let response = await todosController.addTodo({
        title: input.title,
        active: input.active,
      });
      console.log('> Added with id: ', response);
      return await todosController.getTodos();
    }),

  changeActive: t.procedure
    .input(z.object({ id: z.number(), title: z.string(), active: z.boolean() }))
    .mutation(async ({ input }) => {
      console.log('> changing  todo: ', input);
      await todosController.changeActive({
        title: input.title,
        active: input.active,
      });
      let todosList = await todosController.getTodos();
      console.log('> changing Todos: ', todosList);
      return todosList;
    }),

  getTodoById: t.procedure
    .input(z.object({ id: z.number() })) // Input validation with Zod
    .query(async ({ input }) => {
      console.log('>Fetching todo by id: ', input.id);
      try {
        const todo = await todosController.getTodoById(input.id);
      } finally {
        return todo; // Returns the todo with the matching ID
      }
    }),
});

// Export the router type definition
export type AppRouter = typeof appRouter;

// Create the Express app
const app = express();

// Enable CORS for all routes and allow requests from localhost:4200
app.use(
  cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    credentials: true, // Include credentials if needed
  })
);

// Use tRPC middleware for the /trpc route
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  })
);

// Attach tRPC middleware
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

app.get('/', (req, res) => {
  res.send('Todo app server works!');
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
