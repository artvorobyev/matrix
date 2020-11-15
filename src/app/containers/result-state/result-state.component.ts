import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IMatrixValues } from '../../interfaces';

@Component({
  selector: 'app-result-state',
  templateUrl: './result-state.component.html',
  styleUrls: ['./result-state.component.css'],
})
export class ResultStateComponent implements OnInit, OnChanges {
  @Input() matrixValues: IMatrixValues;
  @Output() back = new EventEmitter<void>();
  public result: number[][];
  public error: string;
  constructor() {}

  ngOnInit() {}

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

      this.result = this.calcResult(this.matrixValues);
    }
  }

  public calcResult(data: IMatrixValues): number[][] {
    const m1 = data.first;
    const m2 = data.second;
    var result = [];
    for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m2[0].length; j++) {
        var sum = 0;
        for (var k = 0; k < m1[0].length; k++) {
          sum += m1[i][k] * m2[k][j];
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
