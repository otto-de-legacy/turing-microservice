let sandbox;

before(() => {
  'use strict';

  fixture.setBase('assets/js/fixtures');
});

beforeEach(() => {
  'use strict';

  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  'use strict';

  fixture.cleanup();
  sandbox.restore();
});
