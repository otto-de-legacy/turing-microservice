// its a demo for webpacked karma tests
require('../../../src/client/app');

describe('myAwesomeReactComponent', () => {
  it('expect to convert a given string to a url', () => {
    // given
    const urlString = 'https://www.otto.de/p/lenovo-idea-g70-70-notebook-intel-pentiumtm-43-9-cm-17-3-zoll-1000-gb-speicher-8192-mb-ddr3l-478760954/#variationId=478763868-M24';

    // when
    const url = document.createElement('a');
    url.href = urlString;

    // then
    expect(url.host).to.equal('www.otto.de');
    expect(url.pathname).to
      .equal('/p/lenovo-idea-g70-70-notebook-intel-pentiumtm-43-9-cm-17-3-zoll-1000-gb-speicher-8192-mb-ddr3l-478760954/');
    expect(url.hash).to.equal('#variationId=478763868-M24');
  });
});
