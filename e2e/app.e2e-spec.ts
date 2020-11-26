import { AppPage } from './app.po';

describe('matrix App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Ввод размеров. Корректные размеры', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('2');
    page.getElementById('firstHeight').sendKeys('3');
    page.getElementById('secondWidth').sendKeys('4');
    page.getElementById('secondHeight').sendKeys('2');
    expect(button.getAttribute('disabled')).not.toBeTruthy();

    button.click();
    expect(page.getElementById('inputState')).toBeTruthy();
  });

  it('Ввод размеров. Ширина первой матрицы не равна высоте второй матрицы', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('2');
    page.getElementById('firstHeight').sendKeys('3');
    page.getElementById('secondWidth').sendKeys('4');
    page.getElementById('secondHeight').sendKeys('3');
    expect(!!button.getAttribute('disabled')).toEqual(true);
    expect(
      page.getElementByText(
        'Ширина первой матрицы должна быть равна высоте второй матрицы'
      )
    ).toBeTruthy();
  });

  it('Ввод размеров. Стороны матрицы < 1', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('0');
    page.getElementById('firstHeight').sendKeys('0');
    page.getElementById('secondWidth').sendKeys('0');
    page.getElementById('secondHeight').sendKeys('0');
    expect(!!button.getAttribute('disabled')).toEqual(true);
    expect(
      page.getElementByText('Минимальное значение высоты и ширины = 1')
    ).toBeTruthy();
  });

  it('Приложение должно обеспечивать ввод элементов матрицы, согласно введенным ранее ширине и высоте', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('2');
    page.getElementById('firstHeight').sendKeys('3');
    page.getElementById('secondWidth').sendKeys('4');
    page.getElementById('secondHeight').sendKeys('2');
    button.click();
    expect(page.getMatrixInputs('first').count()).toEqual(6);
    expect(page.getMatrixInputs('second').count()).toEqual(8);
  });

  it('Приложение должно обеспечивать возврат к вводу размеров', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('2');
    page.getElementById('firstHeight').sendKeys('3');
    page.getElementById('secondWidth').sendKeys('4');
    page.getElementById('secondHeight').sendKeys('2');
    button.click();
    page.getElementByText('← Изменить размеры матриц').click();
    expect(page.getElementById('startState')).toBeTruthy();
  });

  it('Приложение должно обеспечивать перемножение матрицы и вывод результата', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('2');
    page.getElementById('firstHeight').sendKeys('1');
    page.getElementById('secondWidth').sendKeys('2');
    page.getElementById('secondHeight').sendKeys('2');
    button.click();
    page.getElementById('first_1_1').sendKeys('1');
    page.getElementById('first_1_2').sendKeys('2');
    page.getElementById('second_1_1').sendKeys('3');
    page.getElementById('second_1_2').sendKeys('4');
    page.getElementById('second_2_1').sendKeys('5');
    page.getElementById('second_2_2').sendKeys('6');
    page.getElementById('inputSubmitButton').click();
    expect(page.getElementsByCss('.matrix-element').count()).toEqual(2);
    expect(page.getElementsByCss('.matrix-element').get(0).getText()).toEqual(
      '13'
    );
    expect(page.getElementsByCss('.matrix-element').get(1).getText()).toEqual(
      '16'
    );
  });

  it('Приложение должно обеспечивать возврат к вводу элементов', () => {
    page.navigateTo();
    const button = page.getElementById('startSubmitButton');
    page.getElementById('firstWidth').sendKeys('2');
    page.getElementById('firstHeight').sendKeys('1');
    page.getElementById('secondWidth').sendKeys('2');
    page.getElementById('secondHeight').sendKeys('2');
    button.click();
    page.getElementById('first_1_1').sendKeys('1');
    page.getElementById('first_1_2').sendKeys('2');
    page.getElementById('second_1_1').sendKeys('3');
    page.getElementById('second_1_2').sendKeys('4');
    page.getElementById('second_2_1').sendKeys('5');
    page.getElementById('second_2_2').sendKeys('6');
    page.getElementById('inputSubmitButton').click();
    page.getElementByText('← Изменить значения').click();
    expect(page.getElementById('inputState')).toBeTruthy();
  });
});
