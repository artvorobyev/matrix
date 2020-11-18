import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppState } from './models';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('При вводе размеров матрицы в поля StartStateComponent они корректно передаются в AppComponent', async(() => {
    const button = fixture.nativeElement.querySelector('.submit-button');
    const parent = fixture.nativeElement;

    const firstWidthInput = parent.querySelector('#firstWidth');
    const firstHeightInput = parent.querySelector('#firstHeight');
    const secondWidthInput = parent.querySelector('#secondWidth');
    const secondHeightInput = parent.querySelector('#secondHeight');

    spyOn(component, 'setMatrixSizes');
    firstWidthInput.value = '2';
    firstHeightInput.value = '3';
    secondWidthInput.value = '4';
    secondHeightInput.value = '2';
    firstWidthInput.dispatchEvent(new Event('input'));
    firstHeightInput.dispatchEvent(new Event('input'));
    secondWidthInput.dispatchEvent(new Event('input'));
    secondHeightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    expect(component.setMatrixSizes).toHaveBeenCalledWith({
      firstWidth: 2,
      firstHeight: 3,
      secondWidth: 4,
      secondHeight: 2,
    });
  }));

  it('При вводе элементов матрицы в поля InputStateComponent они корректно передаются в AppComponent', async(() => {
    spyOn(component, 'setMatrixValues');

    component.matrixSizes = {
      firstWidth: 2,
      firstHeight: 1,
      secondWidth: 2,
      secondHeight: 2,
    };
    component.state = AppState.input;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.submit-button');
    const parent = fixture.nativeElement;

    const firstInput_1_1 = parent.querySelector('#first_1_1');
    const firstInput_1_2 = parent.querySelector('#first_1_2');
    const secondInput_1_1 = parent.querySelector('#second_1_1');
    const secondInput_1_2 = parent.querySelector('#second_1_2');
    const secondInput_2_1 = parent.querySelector('#second_2_1');
    const secondInput_2_2 = parent.querySelector('#second_2_2');

    firstInput_1_1.value = '1';
    firstInput_1_2.value = '2';
    secondInput_1_1.value = '3';
    secondInput_1_2.value = '4';
    secondInput_2_1.value = '5';
    secondInput_2_2.value = '6';

    firstInput_1_1.dispatchEvent(new Event('input'));
    firstInput_1_2.dispatchEvent(new Event('input'));
    secondInput_1_1.dispatchEvent(new Event('input'));
    secondInput_1_2.dispatchEvent(new Event('input'));
    secondInput_2_1.dispatchEvent(new Event('input'));
    secondInput_2_2.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    button.click();
    expect(component.setMatrixValues).toHaveBeenCalledWith({
      first: [[1, 2]],
      second: [
        [3, 4],
        [5, 6],
      ],
    });
  }));
});
