import { Component } from '@angular/core';
import { IMatrixSizes, IMatrixValues } from './interfaces';
import { AppState } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public state = AppState.start;
  public states = AppState;
  public matrixSizes: IMatrixSizes;
  public matrixValues: IMatrixValues;

  public setMatrixSizes(data: IMatrixSizes): void {
    this.matrixSizes = data;
    this.state = AppState.input;
  }
  public switchToStart(): void {
    this.state = AppState.start;
  }
  public setMatrixValues(data: IMatrixValues): void {
    this.matrixValues = data;
    this.state = AppState.result;
  }
  public switchToInput(): void {
    this.state = AppState.input;
  }
}
