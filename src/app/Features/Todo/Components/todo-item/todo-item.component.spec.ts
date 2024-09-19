import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TodoItemComponent } from './todo-item.component';
import { TodosService } from '../../Services/todos.service';

describe('TodoItemComponent', () => {
  let spectator: Spectator<TodoItemComponent>;
  let todosService: TodosService;
  const createComponent = createComponentFactory({
    component: TodoItemComponent,
    mocks: [TodosService],
    detectChanges: false,
  });

  const todos = [
    { id: 0, title: 'Test Todo 1', active: false },
    { id: 11, title: 'Test Todo 2', active: true },
  ];
  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the todo item', () => {
    const todo = { id: 11, title: 'Test Todo 2', active: true };
    spectator.setInput('todo', todo);
    spectator.detectChanges();

    const todoElement = spectator.query(`#todo${todo.id}`);
    expect(todoElement).toHaveText(todo.title);
  });

  it('should have a delete button', () => {
    const todo = { id: 11, title: 'Test Todo 2', active: true };
    spectator.setInput('todo', todo);
    spectator.detectChanges();
    let buttonElement = spectator.query(`#delete${todo.id}`);
    expect(buttonElement).toExist();
  });

  it('should call delete method from todosService', () => {
    const todo = { id: 11, title: 'Test Todo 2', active: true };
    todosService = spectator.inject(TodosService); // Getting the mocked todo service
    // Mock the deleteTodo method
    jest.spyOn(todosService, 'deleteTodo');

    // Call the handleDeleteClick method
    spectator.component.handleDeleteClick(todo);

    // Check if deleteTodo was called with the correct argument
    expect(todosService.deleteTodo).toHaveBeenCalledWith(todo);
  });

  it('should call handleDeleteClick when delete button is clicked', () => {
    todosService = spectator.inject(TodosService); //Getting the mocked Service
    const todo = { id: 11, title: 'Test Todo 2', active: true };
    spectator.setInput('todo', todo);

    // Spy on the handleDeleteClick method
    jest.spyOn(spectator.component, 'handleDeleteClick');

    let buttonElement = spectator.query(`#delete${todo.id}`);
    if (buttonElement) spectator.click(buttonElement);

    expect(spectator.component.handleDeleteClick).toHaveBeenCalledWith(todo);
  });
});
