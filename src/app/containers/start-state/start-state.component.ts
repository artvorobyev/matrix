import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { P } from '@angular/core/src/render3';
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
export class StartStateComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}

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
        negative: 'Минимальное значение высоты и ширины = 1',
      };
    }

    return Object.keys(errors) ? errors : null;
  }

  public getFormValidationErrors(): string[] | null {
    if (!this.form.errors) {
      return null;
    }

    return Object.values(this.form.errors);
  }
}
