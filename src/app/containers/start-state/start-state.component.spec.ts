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

  /* метод formValidator */

  it('Ответ не содержит ошибок', () => {
    expect(
      component.formValidator(
        new FormControl({
          firstWidth: 2,
          firstHeight: 3,
          secondWidth: 4,
          secondHeight: 2,
        })
      )
    ).toEqual(null);
  });

  it('Ответ содержит ошибку с ключом incorrectSizes', () => {
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

  it('Ответ содержит ошибку с ключом notPositive', () => {
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

  /* метод getFormValidationErrors */

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
