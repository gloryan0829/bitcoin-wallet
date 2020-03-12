import * as Express from 'express';
import ResponseHelper from '../../common/helpers/ResponseHelper';
import { balanceOf, getAddressInfo, newWallet, faucet } from '../funcs/wallet';
const router = Express.Router();

router.get('/:address', async (req, res, next) => {
  try {
    const { address } = req.params;
    const response = await getAddressInfo(address);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

router.get('/:address/full', async (req, res, next) => {
  try {
    const { address } = req.params;
    const response = await getAddressInfo(address, true);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

router.post('/faucet', async (req, res, next) => {
  try {
    const { address, amount } = req.body;
    const response = await faucet(address, amount);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

router.get('/balanceOf/:address', async (req, res, next) => {
  try {
    const { address } = req.params;
    const response = await balanceOf(address);
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const response = await newWallet();
    ResponseHelper.sendSuccessMessage(res, response.data);
  } catch (e) {
    next(e);
  }
});


export default router;
