import * as Express from 'express';
import ResponseHelper from '../../common/helpers/ResponseHelper';
import { getTxInfo, makeTx, signTx, sendSignedTx } from '../funcs/transaction';
const router = Express.Router();

router.get('/:txHash', async (req, res, next) => {
  try {
    const { txHash } = req.params;
    const response = await getTxInfo(txHash);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const { from, to, amount } = req.body;
    const response = await makeTx(from, to, amount);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

router.post('/sign', (req, res, next) => {
  try {
    const { tosign, pubKey, privKey } = req.body;
    const signedTx = signTx(tosign, pubKey, privKey);
    ResponseHelper.sendSuccessMessage(res, signedTx);
  } catch (e) {
    next(e);
  }
});

router.post('/send', async (req, res, next) => {
  try {
    const signedTx = req.body;
    const response = await sendSignedTx(signedTx);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});


export default router;
