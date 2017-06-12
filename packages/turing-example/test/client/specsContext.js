'use strict';

const context = require.context('./component', true, /Spec\.js$/);
context.keys().forEach(context);
