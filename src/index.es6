import express from 'express';
import loaders from './common/loaders';
import { SERVER_PORT, NODE_ENV } from './common/constants/environment';

const startServer = () => {
  const app = express();

  loaders(app);

  app.listen(SERVER_PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Token Asset ${NODE_ENV} Server is listening on port ${SERVER_PORT}`);
  });
};

startServer();
