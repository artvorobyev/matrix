import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { StartStateComponent } from './start-state.component';

describe('StartStateComponent Unit Tests', () => {
  let component: StartStateComponent;
  let fixture: ComponentFixture<StartStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartStateComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Ширина первой матрицы равна высоте второй матрицы', () => {
    expect(
      Object.keys(
        component.formValidator(
          new FormControl({
            firstWidth: 2,
            firstHeight: 3,
            secondWidth: 4,
            secondHeight: 2,
          })
        )
      )
    ).not.toContain('incorrectSizes');
  });

  it('Ширина первой матрицы не равна высоте второй матрицы', () => {
    expect(
      Object.keys(
        component.formValidator(
          new FormControl({
            firstWidth: 2,
            firstHeight: 3,
            secondWidth: 4,
            secondHeight: 3,
          })
        )
      )
    ).toContain('incorrectSizes');
  });

  it('Размеры матрицы меньше 1', () => {
    expect(
      Object.keys(
        component.formValidator(
          new FormControl({
            firstWidth: 0,
            firstHeight: 0,
            secondWidth: 0,
            secondHeight: 0,
          })
        )
      )
    ).toContain('notPositive');
  });

  it('Размеры матрицы равен 1', () => {
    expect(
      Object.keys(
        component.formValidator(
          new FormControl({
            firstWidth: 1,
            firstHeight: 1,
            secondWidth: 1,
            secondHeight: 1,
          })
        )
      )
    ).not.toContain('notPositive');
  });

  it('Размеры матрицы больше 1', () => {
    expect(
      Object.keys(
        component.formValidator(
          new FormControl({
            firstWidth: 2,
            firstHeight: 2,
            secondWidth: 2,
            secondHeight: 2,
          })
        )
      )
    ).not.toContain('notPositive');
  });

  it('В форме присутствуют ошибки', () => {
    const form = new FormGroup(
      {
        field: new FormControl(''),
      },
      (f) => {
        return !f.value.field ? { empty: 'Поле должно быть заполнено' } : null;
      }
    );
    expect(component.getFormValidationErrors(form)).toEqual([
      'Поле должно быть заполнено',
    ]);
  });

  it('В форме отсутствуют ошибки', () => {
    const form = new FormGroup(
      {
        field: new FormControl('1'),
      },
      (f) => {
        return !f.value.field ? { empty: 'Поле должно быть заполнено' } : null;
      }
    );
    expect(component.getFormValidationErrors(form)).toEqual(null);
  });
});
