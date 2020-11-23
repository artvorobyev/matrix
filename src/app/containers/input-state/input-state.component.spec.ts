import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputStateComponent } from './input-state.component';

describe('InputStateComponent Unit Tests', () => {
  let component: InputStateComponent;
  let fixture: ComponentFixture<InputStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputStateComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Ключ матрицы (key) присутствует в form, Количество строк >= 1, Количество столбцов >= 1', () => {
    const form = new FormGroup({
      first_1_1: new FormControl(1),
      second_1_1: new FormControl(1),
    });
    const key = 'first';
    const rows = 1;
    const columns = 1;

    const expectedResult = [[1]];
    expect(component.collectValues(form, key, rows, columns)).toEqual(
      expectedResult
    );
  });

  it('Ключ матрицы (key) отсутствует в form', () => {
    const form = new FormGroup({
      first_1_1: new FormControl(1),
    });
    const key = 'second';
    const rows = 1;
    const columns = 1;

    const expectedResult = [];
    expect(component.collectValues(form, key, rows, columns)).toEqual(
      expectedResult
    );
  });

  it('Количество строк < 1', () => {
    const form = new FormGroup({
      first_1_1: new FormControl(1),
      second_1_1: new FormControl(1),
    });
    const key = 'first';
    const rows = -1;
    const columns = 1;

    const expectedResult = [];
    expect(component.collectValues(form, key, rows, columns)).toEqual(
      expectedResult
    );
  });

  it('Количество столбцов < 1', () => {
    const form = new FormGroup({
      first_1_1: new FormControl(1),
      second_1_1: new FormControl(1),
    });
    const key = 'first';
    const rows = 1;
    const columns = -1;

    const expectedResult = [];
    expect(component.collectValues(form, key, rows, columns)).toEqual(
      expectedResult
    );
  });
});
