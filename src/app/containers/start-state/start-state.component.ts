import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { IMatrixSizes } from '../../interfaces';

@Component({
  selector: 'app-start-state',
  templateUrl: './start-state.component.html',
  styleUrls: ['./start-state.component.css'],
})
export class StartStateComponent {
  @Output() next = new EventEmitter<IMatrixSizes>();
  public form = new FormGroup(
    {
      firstWidth: new FormControl('', [Validators.required]),
      firstHeight: new FormControl('', [Validators.required]),
      secondWidth: new FormControl('', [Validators.required]),
      secondHeight: new FormControl('', [Validators.required]),
    },
    this.formValidator
  );

  public onSubmit(): void {
    this.next.emit(this.form.value);
  }

  public formValidator(control: AbstractControl): ValidationErrors | null {
    let errors = {};
    if (
      control.value.firstWidth &&
      control.value.secondHeight &&
      control.value.firstWidth !== control.value.secondHeight
    ) {
      errors = {
        ...errors,
        incorrectSizes:
          'Ширина первой матрицы должна быть равна высоте второй матрицы',
      };
    }

    if (
      Object.values(control.value).filter((value) => value < 1).length &&
      !Object.values(control.value).filter((value) => value === '').length
    ) {
      errors = {
        ...errors,
        notPositive: 'Минимальное значение высоты и ширины = 1',
      };
    }

    return Object.keys(errors) ? errors : null;
  }

  public getFormValidationErrors(form: FormGroup): string[] | null {
    if (!form.errors) {
      return null;
    }

    return Object.values(form.errors);
  }
}
