class BaseReponse {
  constructor(status, success, message) {
    this.status = status;
    this.success = success;
    this.message = message;
  }
}

module.exports = BaseReponse;
