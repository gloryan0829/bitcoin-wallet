import btcRouter from './btcRouter';
import commonRouter from './commonRouter';

import { logErrors, errorHandler } from './middleware';

const routes = (app) => {


  app.use('/', commonRouter);
  app.use('/api/btc', btcRouter);

  app.use(logErrors);
  app.use(errorHandler);
};

export default routes;
