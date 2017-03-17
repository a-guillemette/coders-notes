import { browser, element, by } from 'protractor';

export class CodersNotesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cn-root h1')).getText();
  }
}
