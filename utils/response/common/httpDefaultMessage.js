const HttpDefaultMessage = Object.freeze({
  OK: 'Success',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  PAYLOAD_VAL_ERROR: 'Payload validation error, please check the request',
  SERVER_ERROR: 'Something went wrong, please try again later.',
  LOGIN_SUCCESS: 'Log in successful!',
  ERROR_SIGNING_IN: 'Error occurred while signing in.',
  SIGNUP_SUCCESS: 'Successfully registered the employee. Can login now.',
  USER_EXISTS: 'The email already exists. Please login.',
  ERROR_CREATING_USER: 'Error occurred while creating user.',
  ERROR_CREATE_AUTH: 'Error creating user authentication',
  USER_EXIST: 'User already exists with this email',
  ERROR_DB_WRITE: 'Failed to write data to db',
});

module.exports = HttpDefaultMessage;
