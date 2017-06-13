'use strict';

const context = require.context('./component', true, /\.test\.js$/);
context.keys().forEach(context);
