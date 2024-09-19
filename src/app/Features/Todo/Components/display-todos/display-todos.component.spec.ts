import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';

import { TodosService } from '../../Services/todos.service';
import { DisplayTodosComponent } from './display-todos.component';
import { Todo } from '../../Services/Models/Todo';

describe('DisplayTodosComponent', () => {
  let spectator: Spectator<DisplayTodosComponent>;
  let todosServiceMock: TodosService;
  let todosService: TodosService;

  const createComponent = createComponentFactory({
    component: DisplayTodosComponent,
    mocks: [TodosService],
  });
  const todos = [
    { id: 1, title: 'Test Todo 1', active: false },
    { id: 2, title: 'Test Todo 2', active: true },
  ];

  beforeEach(async () => {
    spectator = createComponent();
    // todosService = spectator.inject(TodosService); // Injecting the service
    spectator.inject(TodosService).getTodos.mockReturnValue(todos);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('obtain todos from todoService', () => {
    spectator.inject(TodosService).getTodos.mockReturnValue(todos);
    // expect(mockTodos).toEqual(todos)
    expect(spectator.component.todos).toEqual(todos);
  });

  // below test case is incomplete. Use id to get all the items
  it('displays all todos in a list', () => {
    let todoList = spectator.queryAll('#todo-list > *');
    // let todo!: Todo;
    let getTodos = todosService.getTodos;
    // let todos = getTodos();
    // console.log(typeof getTodos);
    // for (let i = 0; i < todos.length; i++) {
    //   let todo = spectator.query(`#item${i}`);
    //   expect(todo).toEqual(todos[i]);
    // }

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
