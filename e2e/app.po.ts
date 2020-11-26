import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  getElementById(id: string) {
    return element(by.id(id));
  }

  getElementByText(text: string) {
    return element(by.cssContainingText('*', text));
  }

  getElementsByCss(selector: string) {
    return element.all(by.css(selector));
  }

  getMatrixInputs(matrix: string) {
    return element.all(by.css(`.matrix-form-${matrix} .value-input`));
  }
}
