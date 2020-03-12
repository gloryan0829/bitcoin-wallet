import {
  SUCCESS_MESSAGE,
  FAILED_ERROR_MESSAGE,
} from '../constants/responseMessage';

class ResponseHelper {
  /**
   * 성공 메세지
   * @param res
   * @param data
   * @param code
   * @param success
   * @param message
   */
  static sendSuccessMessage = (res, data, code=200, success = true, message= SUCCESS_MESSAGE) => {
    res.set('Content-Type', 'application/json');
    res.status(code).json({
      success,
      message,
      data: data
    });
  };

  /**
   * 실패 메세지
   * @param res
   * @param err
   * @param code
   */
  static sendErrorMessage = (res, err, code) => {
    const errorMessage = err || 'Error';

    res.status(code).json({
      success: false,
      message: FAILED_ERROR_MESSAGE,
      error: errorMessage
    });
  };
}

export default ResponseHelper;
