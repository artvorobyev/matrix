import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';

import { ResultStateComponent } from './result-state.component';

/* 
Требования:
1) Можно вернуться к вводу значений
2) Матрицы не пустые и ширина первой равна высоте второй
3) Результат считается корректно и выводится на экран

Тест-кейсы:
1) Нажатие на кнопку возврата → Событие возврата
2) Пустая матрица → Сообщение об ошибке
3) Ширина первой матрицы не равна высоте второй → Сообщение об ошибке
4) Результат считается корректно и выводится на экран
*/

describe('ResultStateComponent', () => {
  let component: ResultStateComponent;
  let fixture: ComponentFixture<ResultStateComponent>;
  let backButton: HTMLButtonElement;
  let parent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    backButton = fixture.nativeElement.querySelector('.back-link');
    parent = fixture.nativeElement;
  });

  it('Нажатие на кнопку возврата → Событие возврата', () => {
    spyOn(component.back, 'emit');
    backButton.click();
    expect(component.back.emit).toHaveBeenCalled();
  });

  it('Пустая матрица → Сообщение об ошибке', () => {
    component.matrixValues = {
      first: [],
      second: [[0, 10]],
    };
    component.ngOnChanges({
      matrixValues: new SimpleChange(null, component.matrixValues, true),
    });
    fixture.detectChanges();
    expect(parent.querySelector('.table')).not.toBeTruthy();
    expect(parent.querySelector('.alert')).toBeTruthy();
  });
  it('Ширина первой матрицы не равна высоте второй → Сообщение об ошибке', () => {
    component.matrixValues = {
      first: [[0, 10]],
      second: [[0, 10]],
    };
    component.ngOnChanges({
      matrixValues: new SimpleChange(null, component.matrixValues, false),
    });
    fixture.detectChanges();
    expect(parent.querySelector('.table')).not.toBeTruthy();
    expect(parent.querySelector('.alert')).toBeTruthy();
  });
  it('Результат считается корректно и выводится на экран', () => {
    component.matrixValues = {
      first: [[1, 2]],
      second: [
        [3, 4],
        [5, 6],
      ],
    };
    component.ngOnChanges({
      matrixValues: new SimpleChange(null, component.matrixValues, false),
    });
    fixture.detectChanges();
    const expectedResult = [[13, 16]];
    expect(
      Array.from(parent.querySelectorAll('.table tr')).map((row) =>
        Array.from(row.querySelectorAll('td')).map((column) =>
          parseInt(column.innerText)
        )
      )
    ).toEqual(expectedResult);
  });
});
