'use strict';

module.exports = class HttpStatusHelper {
  static get OK() {
    return 200;
  }

  static get NO_CONTENT() {
    return 204;
  }

  static get NOT_FOUND() {
    return 404;
  }
};
