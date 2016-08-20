'use strict';

module.exports = class Status {
  constructor() {
    this._scoring = {
      OK: 0,
      WARNING: 1,
      ERROR: 2
    };
    this._statuses = [
      'OK',
      'WARNING',
      'ERROR'
    ];
  }

  get scoring() {
    return this._scoring;
  }

  get statuses() {
    return this._statuses;
  }
};
