#!/usr/bin/env node
var vaulted = require("turing-vault");

vaulted.then(function () {
  require("../src/server/app.js").start();
}).catch(function (e) {
  console.log(e);
  process.exit();
});
