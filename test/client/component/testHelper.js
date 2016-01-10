let sandbox;

before(() => {
  fixture.setBase('component/fixture');
});

beforeEach(() => {
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  fixture.cleanup();
  sandbox.restore();
});
