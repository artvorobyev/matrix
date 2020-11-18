import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultStateComponent } from './result-state.component';

describe('ResultStateComponent Unit Tests', () => {
  let component: ResultStateComponent;
  let fixture: ComponentFixture<ResultStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultStateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Ширина первой матрицы равна высоте второй матрицы', () => {
    const first = [[1, 2]];
    const second = [
      [3, 4],
      [5, 6],
    ];
    const expectedResult = [[13, 16]];
    expect(component.calcResult(first, second)).toEqual(expectedResult);
  });

  it('Ширина первой матрицы не равна высоте второй матрицы', () => {
    const first = [[0, 10]];
    const second = [[0, 10]];
    const expectedResult = null;
    expect(component.calcResult(first, second)).toEqual(expectedResult);
  });

  it('Одна из матриц пустая (или обе)', () => {
    const first = [];
    const second = [[0, 10]];
    const expectedResult = null;
    expect(component.calcResult(first, second)).toEqual(expectedResult);
  });

  it('Обе матрицы имеют хотя бы одну строку и столбец', () => {
    const first = [[1, 2]];
    const second = [
      [3, 4],
      [5, 6],
    ];
    const expectedResult = [[13, 16]];
    expect(component.calcResult(first, second)).toEqual(expectedResult);
  });
});
