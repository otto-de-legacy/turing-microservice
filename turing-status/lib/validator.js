'use strict';

const Joi = require('joi');
const statuses = require('./statusObject').statuses;

module.exports = (() => {
  function assertValidStatusDetail(statusDetail) {
    Joi.assert(statusDetail, {
      status: Joi.string()
        .required()
        .valid(...statuses),
      message: Joi.string()
        .required()
    });
  }

  function assertValidName(name) {
    Joi.assert(name, Joi.string()
      .label('name')
      .required());
  }

  return {
    assertValidStatusDetail,
    assertValidName
  };
})();
