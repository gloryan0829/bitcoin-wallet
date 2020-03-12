import DBManager from '../db/mongo/DBManager';
import {
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USERNAME,
} from './constants/environment';

export default () => {
  const dbManager = DBManager.getInstance(
    MONGO_HOST || '52.78.11.0',
    MONGO_PORT || 42222,
    MONGO_DATABASE || 'crypto_dev',
    MONGO_USERNAME || 'developer',
    MONGO_PASSWORD || 'developer',
  );

  dbManager.connect();
};
