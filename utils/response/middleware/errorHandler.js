const { ErrorResponse } = require('../payloads');
const { HttpDefaultMessage, HttpStatusCode } = require('../common');

const sendErrorResponse = (err, _req, res, next) => {
  if (err) {
    if (err instanceof ErrorResponse) {
      return res.send(err);
    }
    const error = new ErrorResponse(
      HttpStatusCode.SERVER_ERROR,
      HttpDefaultMessage.SERVER_ERROR,
      err,
    );
    return res.send(error);
  }
  return next();
};

const notFoundError = (_req, res, next) => {
  const error = new ErrorResponse(
    HttpStatusCode.NOT_FOUND,
    HttpDefaultMessage.NOT_FOUND,
  );
  return next(error);
};

module.exports = {
  sendErrorResponse,
  notFoundError,
};
