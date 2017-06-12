'use strict';

const Joi = require('joi');
const {logger: log} = require('turing-logging');

function assert(value, schema) {
  Joi.validate(value, schema, (error) => {
    if (error) {
      log.error(error);
      throw error;
    }
  });
}

class StatusValidator {
  static assertValidStatusDetail(statusDetail, statuses) {
    assert(statusDetail, {
      status: Joi.string()
        .required()
        .valid(...statuses),
      message: Joi.string()
        .required()
    });
  }

  static assertValidName(name) {
    assert(name, Joi.string()
      .label('name')
      .required());
  }
}

module.exports = StatusValidator;
