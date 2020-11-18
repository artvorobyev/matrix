import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMatrixSizes, IMatrixValues } from '../../interfaces';

@Component({
  selector: 'app-input-state',
  templateUrl: './input-state.component.html',
  styleUrls: ['./input-state.component.css'],
})
export class InputStateComponent implements OnChanges {
  @Input() matrixSizes: IMatrixSizes;
  @Output() back = new EventEmitter<void>();
  @Output() calculate = new EventEmitter<IMatrixValues>();
  public firstMatrixRows: any[];
  public firstMatrixColumns: any[];
  public secondMatrixRows: any[];
  public secondMatrixColumns: any[];
  public form = new FormGroup({});
  public error: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.matrixSizes) {
      if (Object.values(this.matrixSizes).filter((item) => item < 1).length) {
        this.error = 'Размеры матрицы не должны быть меньше 1';
        return;
      }

      this.firstMatrixRows = Array(this.matrixSizes.firstHeight);
      this.firstMatrixColumns = Array(this.matrixSizes.firstWidth);
      this.createFields(
        'first',
        this.matrixSizes.firstHeight,
        this.matrixSizes.firstWidth
      );
      this.secondMatrixRows = Array(this.matrixSizes.secondHeight);
      this.secondMatrixColumns = Array(this.matrixSizes.secondWidth);
      this.createFields(
        'second',
        this.matrixSizes.secondHeight,
        this.matrixSizes.secondWidth
      );
    }
  }

  public goBack(): void {
    this.back.emit();
  }

  public createFields(key: string, rows: number, columns: number): void {
    for (let row = 1; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        this.form.addControl(
          `${key}_${row}_${column}`,
          new FormControl('', [Validators.required])
        );
      }
    }
  }

  public onSubmit(): void {
    const values = {
      first: this.collectValues(
        this.form,
        'first',
        this.matrixSizes.firstHeight,
        this.matrixSizes.firstWidth
      ),
      second: this.collectValues(
        this.form,
        'second',
        this.matrixSizes.secondHeight,
        this.matrixSizes.secondWidth
      ),
    };
    this.calculate.emit(values);
  }

  public collectValues(
    form: FormGroup,
    key: string,
    rows: number,
    columns: number
  ): number[][] {
    let array = [];
    if (
      !Object.keys(form.value).filter((item) => item.includes(key)).length ||
      columns < 1 ||
      rows < 1
    ) {
      return array;
    }

    for (let row = 0; row < rows; row++) {
      array[row] = [];
      for (let column = 0; column < columns; column++) {
        array[row][column] = form.value[`${key}_${row + 1}_${column + 1}`];
      }
    }
    return array;
  }
}
