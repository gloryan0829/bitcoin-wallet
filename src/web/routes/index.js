import blockchainRouter from './blockchainRouter';
import walletRouter from './walletRouter';
import commonRouter from './commonRouter';
import transactionRouter from './transactionRouter';

import { logErrors, errorHandler } from './middleware';

const routes = (app) => {


  app.use('/', commonRouter);
  app.use('/api/main', blockchainRouter);
  app.use('/api/wallet', walletRouter);
  app.use('/api/txs', transactionRouter);

  app.use(logErrors);
  app.use(errorHandler);
};

export default routes;
