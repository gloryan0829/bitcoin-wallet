import BlockCypher from '../../helpers/BlockCypher';
import { BLOCK_CYPHER_CHAIN, BLOCK_CYPHER_COIN, BLOCK_CYPHER_TOKEN } from '../../common/constants/environment';
const blockCypher = new BlockCypher(BLOCK_CYPHER_COIN, BLOCK_CYPHER_CHAIN, BLOCK_CYPHER_TOKEN);

export const getAddressInfo = (address, detail) => {
  return blockCypher.getAddressInfo(address, detail);
};

export const newWallet = () => {
  return blockCypher.newWallet();
};

export const faucet = (address, amount) => {
  return blockCypher.faucet(address, amount);
};

export const balanceOf = (address) => {
  return blockCypher.balanceOf(address);
};
