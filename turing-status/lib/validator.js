'use strict';

const Joi = require('joi');
const statuses = require('./statusObject').statuses;
const logger = require('turing-logging').logger;

module.exports = (() => {
  function assertValidStatusDetail(statusDetail) {
    assert(statusDetail, {
      status: Joi.string()
        .required()
        .valid(...statuses),
      message: Joi.string()
        .required()
    });
  }

  function assertValidName(name) {
    assert(name, Joi.string()
      .label('name')
      .required());
  }

  function assert(value, schema) {
    Joi.validate(value, schema, (error) => {
      if (error) {
        logger.error(error);
        throw error;
      }
    });
  }

  return {
    assertValidStatusDetail,
    assertValidName
  };
})();
