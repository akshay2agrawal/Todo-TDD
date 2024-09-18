import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { TodosService } from '../../Services/todos.service';
import { DisplayTodosComponent } from './display-todos.component';

describe('DisplayTodosComponent', () => {
  let spectator: Spectator<DisplayTodosComponent>;
  let todosService: TodosService;
  const createComponent = createComponentFactory({
    component: DisplayTodosComponent,
    providers: [
      TodosService, // Provide the real service
      // { provide: TodoService, useValue: mockTodoService } // Or use a mock service
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    todosService = spectator.inject(TodosService); // Injecting the service
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('obtain todos from todoService', () => {
    expect(spectator.component.todos).toEqual(todosService.todos);
  });
  // below test case is incomplete. Use id to get all the items
  it('displays all todos in a list', () => {
    let todoList = spectator.queryAll('#todo-list > *');

    console.log('length of todo is ', todoList.length);

    // working up until here
    expect(todoList.length).toEqual(todosService.todos.length);
    todoList.forEach((todo, index) => {
      console.log(todo, index);
      let title = spectator.query('li')?.textContent;
      if (title) {
        expect(title).toEqual(todosService.todos[index].title);
      }
    });
  });
});
