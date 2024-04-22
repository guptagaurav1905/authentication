const snakeKeys = require('snakecase-keys');
const { BaseResponse, HttpStatusCode, HttpDefaultMessage } = require('../common');

class SuccessResponse extends BaseResponse {
  constructor(
    data,
    message,
    status,
    isFile = false,
    contentType = null,
    fileName = null,
  ) {
    super(status ?? HttpStatusCode.OK, true, message ?? HttpDefaultMessage.OK);
    if (isFile && (!contentType || !fileName)) {
      throw new Error(
        'Content type, File name are required for file responses',
      );
    }
    this.isFile = isFile;
    this.contentType = contentType;
    this.fileName = fileName;
    this.data = data;
  }

  format() {
    if (this.isFile) {
      return {
        success: this.success,
        message: this.message,
        data: this.data ? snakeKeys(this.data) : this.data,
        isFile: this.isFile,
        fileName: this.fileName,
      };
    }
    return {
      success: this.success,
      message: this.message,
      data: this.data ? snakeKeys(this.data) : this.data,
    };
  }

  merge(successResponse) {
    // merge data of successResponse into this
    if (successResponse instanceof SuccessResponse) {
      this.data = { ...this.data, ...successResponse.data };
    }
    if (Array.isArray(successResponse)) {
      // merge all data into data
      this.data = successResponse.reduce((acc, curr) => {
        if (curr instanceof SuccessResponse) {
          return { ...acc, ...curr.data };
        }
        return acc;
      }, this.data);
    }
  }
}

module.exports = SuccessResponse;
