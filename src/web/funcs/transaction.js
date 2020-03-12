import BlockCypher from '../../helpers/BlockCypher';
import { BLOCK_CYPHER_CHAIN, BLOCK_CYPHER_COIN, BLOCK_CYPHER_TOKEN } from '../../common/constants/environment';

const blockCypher = new BlockCypher(BLOCK_CYPHER_COIN, BLOCK_CYPHER_CHAIN, BLOCK_CYPHER_TOKEN);

export const getTxInfo = async (txHash) => {
  return blockCypher.getTxInfo(txHash);
};

export const makeTx = async (from, to, amount) => {
  return blockCypher.makeTx(from, to, amount);
};

export const signTx = (tosign, pubKey, privKey) => {
  return blockCypher.signTx(tosign, pubKey, privKey);
};

export const sendSignedTx = (signedTx) => {
  return blockCypher.sendSignedTx(signedTx);
};
