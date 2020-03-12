import BlockCypher from '../../helpers/BlockCypher';
import { BLOCK_CYPHER_CHAIN, BLOCK_CYPHER_COIN, BLOCK_CYPHER_TOKEN } from '../../common/constants/environment';

const blockCypher = new BlockCypher(BLOCK_CYPHER_COIN, BLOCK_CYPHER_CHAIN, BLOCK_CYPHER_TOKEN);

export const getChain = async () => {
  return blockCypher.getChain();
};
