class ErrorMessages {
  static errorMessage400(res, message) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message,
    });
  }
}

export default ErrorMessages;
