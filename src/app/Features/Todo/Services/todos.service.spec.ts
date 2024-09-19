import {
  createComponentFactory,
  createServiceFactory,
  SpectatorService,
} from '@ngneat/spectator';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let spectator: SpectatorService<TodosService>;
  const createService = createServiceFactory(TodosService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should return list of todos', () => {
    let todos = spectator.service.getTodos();
    expect(todos).toExist;
    expect(todos.length).toEqual(5);
  });

  it('should return true and add the todo to the list when a valid todo is added', () => {
    const todo = { id: 99, title: 'New Todo', active: true };
    const result = spectator.service.addTodo(todo);

    expect(result).toBe(true);
    expect(spectator.service.getTodos()[0]).toEqual(todo);
  });

  it('should return false if id already exists', () => {
    const todo = { id: 1, title: 'New Todo', active: true };
    const result = spectator.service.addTodo(todo);

    expect(result).toBe(false);
  });
});
