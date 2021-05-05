class MessagesHandler {
  static errorMessage(res, statusCode, message, errors) {
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
      errors
    });
  }

  static successMessage(res, statusCode, message, data) {
    return res.status(statusCode).json({
      status: 'success',
      statusCode,
      message,
      data
    });
  }
}

export default MessagesHandler;
