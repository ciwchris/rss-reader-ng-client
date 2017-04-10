import { RssReaderClientPage } from './app.po';

describe('rss-reader-client App', () => {
  let page: RssReaderClientPage;

  beforeEach(() => {
    page = new RssReaderClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
