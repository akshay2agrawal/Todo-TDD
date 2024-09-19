import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TodosService } from '../../Services/todos.service';
import { DisplayTodosComponent } from './display-todos.component';
import { Todo } from '../../Services/Models/Todo';

describe('DisplayTodosComponent', () => {
  let spectator: Spectator<DisplayTodosComponent>;
  let todosService: jest.Mocked<TodosService>;
  // let todosServiceMock: TodosService;

  const createComponent = createComponentFactory({
    component: DisplayTodosComponent,
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

  it('obtain todos from todosService', () => {
    //pass mock return value for the getTodos method of the todosService
    spectator.inject(TodosService).getTodos.mockReturnValue(todos);

    // Trigger onInit using detectChanges
    spectator.detectChanges();

    expect(spectator.component.todos).toEqual(todos);
  });

  // below test case is incomplete. Use id to get all the items
  it('displays all todos in a list', () => {
    spectator.inject(TodosService).getTodos.mockReturnValue(todos);
    spectator.detectChanges();

    // checking todo list length
    let todoList = spectator.queryAll('#todo-list > *');
    expect(todoList.length).toEqual(spectator.component.todos.length);

    //check if all the items have correct title
    spectator.component.todos.forEach((todo) => {
      let listItem = spectator.query(`#item${todo.id}`); //query todo item via id
      if (listItem) expect(listItem.textContent).toContain(todo.title);
    });
  });
});
