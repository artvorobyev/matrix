import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IMatrixValues } from '../../interfaces';

@Component({
  selector: 'app-result-state',
  templateUrl: './result-state.component.html',
  styleUrls: ['./result-state.component.css'],
})
export class ResultStateComponent implements OnChanges {
  @Input() matrixValues: IMatrixValues;
  @Output() back = new EventEmitter<void>();
  public result: number[][] | null;
  public error: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.matrixValues) {
      if (!this.matrixValues.first.length || !this.matrixValues.second.length) {
        this.error = 'Матрица не может быть пустой';
        return;
      }
      if (
        this.matrixValues.first[0].length !== this.matrixValues.second.length
      ) {
        this.error =
          'Ширина первой матрицы должна быть равна высоте второй матрицы';
        return;
      }

      this.result = this.calcResult(
        this.matrixValues.first,
        this.matrixValues.second
      );
    }
  }

  public calcResult(first: number[][], second: number[][]): number[][] | null {
    if (!first.length || !second.length) {
      return null;
    }

    if (first[0].length !== second.length) {
      return null;
    }

    var result = [];
    for (var i = 0; i < first.length; i++) {
      result[i] = [];
      for (var j = 0; j < second[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < first[0].length; k++) {
          sum += first[i][k] * second[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  public goBack(): void {
    this.back.emit();
  }
}
