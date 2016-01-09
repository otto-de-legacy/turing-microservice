let sandbox;

before(() => {
  fixture.setBase('assets/js/fixtures');
});

beforeEach(() => {
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  fixture.cleanup();
  sandbox.restore();
});
