'use strict';

const Joi = require('joi');
const logger = require('turing-logging').logger;

function assert(value, schema) {
  Joi.validate(value, schema, (error) => {
    if (error) {
      logger.error(error);
      throw error;
    }
  });
}

module.exports = class StatusValidator {

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
};
