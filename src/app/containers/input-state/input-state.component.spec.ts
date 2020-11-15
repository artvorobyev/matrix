import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { InputStateComponent } from './input-state.component';

/*
Требования:
1) Можно вернуться к вводу размеров
2) Можно ввести то количество значений, которое соответствует переданным размерам
3) Значения не должны быть пустыми
4) Передающиеся данные соответствуют введенным

Тест-кейсы:
1) Нажатие на кнопку возврата → Событие возврата
2) Размеры меньше единицы → Сообщение об ошибке, форма отсутствует
3) Количество полей соответствует размерам
4) Введены пустые значения → Событие отправки не срабатывает
5) Введены не пустые значения, нажатие на кнопку → Событие отправки срабатывает с соответствующими данными
 */
function chunk(arr: number[], len: number): number[] {
  let chunks = [];
  let i = 0;
  let n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

describe('InputStateComponent', () => {
  let component: InputStateComponent;
  let fixture: ComponentFixture<InputStateComponent>;
  let submitButton: HTMLButtonElement;
  let backButton: HTMLButtonElement;
  let parent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitButton = fixture.nativeElement.querySelector('.submit-button');
    backButton = fixture.nativeElement.querySelector('.back-link');
    parent = fixture.nativeElement;
  });

  it('Нажатие на кнопку возврата → Событие возврата', () => {
    spyOn(component.back, 'emit');
    backButton.click();
    expect(component.back.emit).toHaveBeenCalled();
  });

  it('Размеры меньше единицы → Сообщение об ошибке, форма отсутствует', () => {
    component.matrixSizes = {
      firstWidth: 0,
      firstHeight: 0,
      secondWidth: 0,
      secondHeight: 0,
    };
    component.ngOnChanges({
      matrixSizes: new SimpleChange(null, component.matrixSizes, true),
    });
    fixture.detectChanges();
    expect(parent.querySelector('.form')).not.toBeTruthy();
    expect(parent.querySelector('.alert')).toBeTruthy();
  });

  it('Количество полей соответствует размерам', () => {
    spyOn(component.calculate, 'emit');

    component.matrixSizes = {
      firstWidth: 1,
      firstHeight: 2,
      secondWidth: 3,
      secondHeight: 1,
    };
    component.ngOnChanges({
      matrixSizes: new SimpleChange(null, component.matrixSizes, false),
    });
    fixture.detectChanges();

    expect(parent.querySelectorAll('.value-input').length).toEqual(5);
  });

  it('Введены пустые значения → Событие отправки не срабатывает', () => {
    spyOn(component.calculate, 'emit');

    component.matrixSizes = {
      firstWidth: 1,
      firstHeight: 2,
      secondWidth: 3,
      secondHeight: 1,
    };
    component.ngOnChanges({
      matrixSizes: new SimpleChange(null, component.matrixSizes, false),
    });
    fixture.detectChanges();

    Array.from(parent.querySelectorAll('.value-input')).forEach(
      (input: HTMLInputElement) => {
        input.value = '';
        input.dispatchEvent(new Event('input'));
      }
    );
    submitButton.click();

    expect(component.calculate.emit).not.toHaveBeenCalled();
  });

  it('Введены не пустые значения, нажатие на кнопку → Событие отправки срабатывает с соответствующими данными', () => {
    spyOn(component.calculate, 'emit');

    component.matrixSizes = {
      firstWidth: 2,
      firstHeight: 2,
      secondWidth: 3,
      secondHeight: 2,
    };
    component.ngOnChanges({
      matrixSizes: new SimpleChange(null, component.matrixSizes, false),
    });
    fixture.detectChanges();

    let mockValues = [];
    for (let i = 0; i < 10; i++) {
      mockValues[i] = Math.floor(Math.random() * 10);
    }

    Array.from(parent.querySelectorAll('.value-input')).forEach(
      (input: HTMLInputElement, index: number) => {
        input.value = mockValues[index].toString();
        input.dispatchEvent(new Event('input'));
      }
    );
    fixture.detectChanges();
    submitButton.click();
    expect(component.calculate.emit).toHaveBeenCalledWith({
      first: chunk(mockValues.slice(0, 4), 2),
      second: chunk(mockValues.slice(4), 3),
    });
  });
});
