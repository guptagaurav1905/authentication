const { SuccessResponse, ErrorResponse } = require('../payloads');
const { HttpStatusCode } = require('../common');

const envErrorFilter = ['production', 'prod'];

const responseHandler = (req, res, next) => {
  const originalSend = res.send;
  res.send = (body) => {
    if (body instanceof SuccessResponse || body instanceof ErrorResponse) {
      if (body.isFile) {
        res.status(body.status);
        res.setHeader('Content-Type', body.contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${body.fileName}`);
        originalSend.call(res, body.data);
      } else {
        res.status(body.status);
        if (
          body.status >= HttpStatusCode.SERVER_ERROR
          && envErrorFilter.includes(process.env.NODE_ENV)
        ) {
          body.removeError();
        }
        originalSend.call(res, body.format());
      }
    } else {
      originalSend.call(res, body);
    }
  };
  next();
};

module.exports = responseHandler;
