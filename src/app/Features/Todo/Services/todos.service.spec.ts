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
});
