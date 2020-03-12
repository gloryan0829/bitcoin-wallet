import ResponseHelper from '../../common/helpers/ResponseHelper';
import {
  NO_CHAT,
  NO_MESSAGE,
  NO_USER,
  NO_FILE,
} from '../../common/constants/errorMessage';

const getCode = (err) => {
  switch(err) {
    case NO_CHAT:
    case NO_MESSAGE:
    case NO_USER:
    case NO_FILE:
      return 204;
    default:
      return 500;
  };
};

/**
 * 에러 로그 남김
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

/**
 * 에러 처리
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (err, req, res, next) => {
  ResponseHelper.sendErrorMessage(res, err, getCode(err));
};
