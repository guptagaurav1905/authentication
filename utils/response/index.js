const common = require('./common');
const payloads = require('./payloads');
const middleware = require('./middleware');

const { BaseResponse, HttpDefaultMessage, HttpStatusCode } = common;
const { ErrorResponse, SuccessResponse } = payloads;
const { responseHandler } = middleware;

module.exports = {
  common,
  payloads,
  middleware,
  BaseResponse,
  HttpDefaultMessage,
  HttpStatusCode,
  ErrorResponse,
  SuccessResponse,
  responseHandler,
};
