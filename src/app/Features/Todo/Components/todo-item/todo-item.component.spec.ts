import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TodoItemComponent } from './todo-item.component';
import { TodosService } from '../../Services/todos.service';

describe('TodoItemComponent', () => {
  let spectator: Spectator<TodoItemComponent>;
  const createComponent = createComponentFactory({
    component: TodoItemComponent,
    mocks: [TodosService],
    detectChanges: false,
  });
  const todo = { id: 1, title: 'Test Todo', active: true };

  beforeEach(async () => {
    spectator = createComponent();
    spectator.setInput('todo', todo);
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the todo item', () => {
    //
    const todoElement = spectator.query(`#todo${todo.id}`);
    expect(todoElement).toHaveText(todo.title);
  });
});
