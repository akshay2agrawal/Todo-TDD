// src/server.ts

import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { todo } from 'node:test';
import { input } from '@angular/core';

// Initialize tRPC
const t = initTRPC.create();

const todos = [
  { id: 1, title: 'Buy groceries', active: true },
  { id: 2, title: 'Do laundry', active: true },
  { id: 3, title: 'Finish homework', active: true },
  { id: 4, title: 'Meet with friends', active: true },
  { id: 5, title: 'Clean the house', active: true },
];

// Define tRPC router with different procedures
const appRouter = t.router({
  getTodo: t.procedure.query(() => {
    return todos;
  }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.number(), title: z.string(), active: z.boolean() }))
    .mutation(({ input }) => {
      const index = todos.findIndex((t) => t.id === input.id);
      todos.splice(index, 1);
      todos.map((todo, index) => {
        todo.id = index;
      });
      console.log(todos);
      return todos;
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
