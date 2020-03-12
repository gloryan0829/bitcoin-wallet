import * as Express from 'express';
const router = Express.Router();

router.get('/health-check', (req, res) => {
  res.status(200).send('bitcoin-wallet api server healthy!');
});

export default router;
