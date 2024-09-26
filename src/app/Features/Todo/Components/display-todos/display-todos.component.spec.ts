import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TodosService } from '../../Services/todos.service';
import { DisplayTodosComponent, sleep } from './display-todos.component';
import { Todo } from '../../Services/Models/Todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';

describe('DisplayTodosComponent', () => {
  let spectator: Spectator<DisplayTodosComponent>;
  let todosService: jest.Mocked<TodosService>;
  // let todosServiceMock: TodosService;

  const createComponent = createComponentFactory({
    component: DisplayTodosComponent,
    imports: [FormsModule, TodoItemComponent],
    mocks: [TodosService],
    detectChanges: false, //prevents onInit to be called at the start. Will only be executed when detectChanges is called.
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

  it('obtain todos from todosService', async () => {
    //pass mock return value for the getTodos method of the todosService
    spectator.inject(TodosService).getTodos.mockResolvedValue(todos);

    // Trigger onInit using detectChanges
    spectator.detectChanges();
    await spectator.fixture.whenStable();

    expect(spectator.component.todos).toEqual(todos);
  });

  // below test case is incomplete. Use id to get all the items
  it('displays all todos in a list', async () => {
    spectator.inject(TodosService).getTodos.mockResolvedValue(todos);

    spectator.detectChanges();
    await spectator.fixture.whenStable();
    spectator.detectChanges();
    let todoList = spectator.queryAll('#todo-list > *');
    expect(todoList.length).toEqual(spectator.component.todos.length);

    //check if all the items have correct title
    spectator.component.todos.forEach((todo) => {
      let listItem = spectator.query(`#todo${todo.id}`); //query todo item via id
      if (listItem) expect(listItem.textContent).toContain(todo.title);
    });
  });

  it('should call updateTodos with true from deleteTodo', async () => {
    const todosService = spectator.inject(TodosService);

    // Mock the getTodos method to return the predefined todos
    todosService.getTodos.mockResolvedValue(todos);
    spectator.detectChanges();
    await spectator.fixture.whenStable();
    spectator.detectChanges();

    // Mock the deleteTodo method to modify the component's todos array directly
    todosService.deleteTodo.mockResolvedValue(true);
    jest.spyOn(spectator.component, 'updateTodos');
    const todoItem = spectator.query(`#delete${todos[0].id}`);
    spectator.click(`#delete${todos[0].id}`);

    // Re-render after deletion
    await spectator.fixture.whenStable();
    spectator.detectChanges();
    expect(spectator.component.updateTodos).toHaveBeenCalledWith(true);
  });

  it('should have a submit button for adding todo', () => {
    expect(spectator.query('#addTodo')).toBeTruthy();
  });

  it('should have an input field to add new todo', () => {
    expect(spectator.query('#newTodo')).toBeTruthy();
    spectator.component.newTodo = 'Test';
    const input = spectator.query('#newTodo')?.textContent;
    if (input) expect(input).toEqual('Test');
  });

  it('should call handleAddTodo and add a new todo', async () => {
    const todosService = spectator.inject(TodosService);

    // Mock the getTodos method to return a predefined list of todos
    const todos = [{ id: 1, title: 'Existing Todo', active: true }];
    todosService.getTodos.mockResolvedValue(todos);
    spectator.detectChanges();
    await spectator.fixture.whenStable();

    // Spy on the addTodo method
    const addTodoSpy = jest.spyOn(todosService, 'addTodo');

    // Set the input value using Spectator's setInput
    spectator.component.newTodo = 'Test';

    // Trigger the form submission
    spectator.click('#addTodo');
    // Define the expected new todo object
    const expectedTodo = {
      id: todos.length + 1, // Assuming new ID based on length
      title: 'Test',
      active: true,
    };

    spectator.detectChanges();
    await spectator.fixture.whenStable();
    // Verify that addTodo was called with the correct argument
    expect(addTodoSpy).toHaveBeenCalledWith(expectedTodo);
  });
});
