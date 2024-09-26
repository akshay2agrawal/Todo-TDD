import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTodoDetailComponent } from './display-todo-detail.component';

describe('DisplayTodoDetailComponent', () => {
  let component: DisplayTodoDetailComponent;
  let fixture: ComponentFixture<DisplayTodoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTodoDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayTodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
