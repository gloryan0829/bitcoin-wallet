import * as Express from 'express';
import ResponseHelper from '../../common/helpers/ResponseHelper';
import { getChain } from '../funcs/blockchain';
const router = Express.Router();

router.get('/chain', async (req, res, next) => {
  try {
    const response = await getChain();
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

export default router;
