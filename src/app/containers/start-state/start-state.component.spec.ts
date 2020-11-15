import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { IMatrixSizes } from '../../interfaces';

import { StartStateComponent } from './start-state.component';
/*
  Требования:
  1) можно ввести положительные числа
  2) Ширина первой матрицы должна быть равна высоте второй матрицы
  3) можно отправить данные
  Тест-кейсы:
  1) Не ввели данные → Отправка не произошла
  2) Ввели не числа → Отправка не произошла
  3) Ввели не положительные числа → Отправка не произошла
  4) Ввели разные значения для ширины первой и высоты второй матрицы → Отправка не произошла
  5) Ввели положительные числа, ширина первой равна высоте второй матрицы → Произошла отправка
*/

describe('StartStateComponent', () => {
  let component: StartStateComponent;
  let fixture: ComponentFixture<StartStateComponent>;
  let button: HTMLElement;
  let parent: HTMLElement;
  let firstWidthInput: HTMLInputElement;
  let firstHeightInput: HTMLInputElement;
  let secondWidthInput: HTMLInputElement;
  let secondHeightInput: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    button = fixture.nativeElement.querySelector('.submit-button');
    parent = fixture.nativeElement;

    firstWidthInput = parent.querySelector('#firstWidth');
    firstHeightInput = parent.querySelector('#firstHeight');
    secondWidthInput = parent.querySelector('#secondWidth');
    secondHeightInput = parent.querySelector('#secondHeight');
  });

  it('Не ввели данные → Отправка не произошла', () => {
    spyOn(component.next, 'emit');

    firstWidthInput.value = '';
    firstHeightInput.value = '';
    secondWidthInput.value = '';
    secondHeightInput.value = '';

    firstWidthInput.dispatchEvent(new Event('input'));
    firstHeightInput.dispatchEvent(new Event('input'));
    secondWidthInput.dispatchEvent(new Event('input'));
    secondHeightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();

    expect(component.next.emit).not.toHaveBeenCalled();
  });

  it('Ввели не числа → Отправка не произошла', () => {
    spyOn(component.next, 'emit');

    firstWidthInput.value = 'string1';
    firstHeightInput.value = 'string2';
    secondWidthInput.value = '-';
    secondHeightInput.value = 'string';

    firstWidthInput.dispatchEvent(new Event('input'));
    firstHeightInput.dispatchEvent(new Event('input'));
    secondWidthInput.dispatchEvent(new Event('input'));
    secondHeightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();

    expect(component.next.emit).not.toHaveBeenCalled();
  });

  it('Ввели не положительные числа → Отправка не произошла', () => {
    spyOn(component.next, 'emit');

    firstWidthInput.value = '1';
    firstHeightInput.value = '1';
    secondWidthInput.value = '-1';
    secondHeightInput.value = '1';

    firstWidthInput.dispatchEvent(new Event('input'));
    firstHeightInput.dispatchEvent(new Event('input'));
    secondWidthInput.dispatchEvent(new Event('input'));
    secondHeightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.click();

    expect(component.next.emit).not.toHaveBeenCalled();
  });

  it('Ввели разные значения для ширины первой и высоты второй матрицы → Отправка не произошла', () => {
    spyOn(component.next, 'emit');

    firstWidthInput.value = '10';
    firstHeightInput.value = '10';
    secondWidthInput.value = '8';
    secondHeightInput.value = '8';

    firstWidthInput.dispatchEvent(new Event('input'));
    firstHeightInput.dispatchEvent(new Event('input'));
    secondWidthInput.dispatchEvent(new Event('input'));
    secondHeightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();

    expect(component.next.emit).not.toHaveBeenCalled();
  });

  it('Ввели положительные числа, ширина первой равна высоте второй матрицы → Произошла отправка введенных значений', () => {
    spyOn(component.next, 'emit');
    firstWidthInput.value = '10';
    firstHeightInput.value = '10';
    secondWidthInput.value = '8';
    secondHeightInput.value = '10';
    firstWidthInput.dispatchEvent(new Event('input'));
    firstHeightInput.dispatchEvent(new Event('input'));
    secondWidthInput.dispatchEvent(new Event('input'));
    secondHeightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    expect(component.next.emit).toHaveBeenCalledWith({
      firstWidth: 10,
      firstHeight: 10,
      secondWidth: 8,
      secondHeight: 10,
    });
  });
});
