import * as Express from 'express';
const router = Express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('btc api !');
});

export default router;
