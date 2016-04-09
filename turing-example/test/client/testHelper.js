'use strict';

let sandbox;

before(() => {
  fixture.setBase('fixture');
});

beforeEach(() => {
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  fixture.cleanup();
  sandbox.restore();
});
