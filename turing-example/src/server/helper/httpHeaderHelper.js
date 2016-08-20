'use strict';

module.exports = class HttpHeaderHelper {
  static get CACHE_CONTROL() {
    return 'Cache-Control';
  }

  static get CONTENT_TYPE() {
    return 'Content-Type';
  }

  static get CROSS_ORIGN() {
    return 'Access-Control-Allow-Origin';
  }

  static get SURROGATE_CONTROL() {
    return 'Surrogate-Control';
  }

  static get X_TRACKABLE() {
    return 'X-Trackable';
  }
};
