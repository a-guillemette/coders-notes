import { CodersNotesPage } from './app.po';

describe('coders-notes App', () => {
  let page: CodersNotesPage;

  beforeEach(() => {
    page = new CodersNotesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cn works!');
  });
});
