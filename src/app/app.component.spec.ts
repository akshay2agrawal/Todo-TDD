import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory(AppComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have the title', () => {
    expect(spectator.component.title).toEqual('my-todo-app');
  });

  it('should render title', () => {
    expect(spectator.query('h1')).toHaveText('Hello, my-todo-app');
  });
});
