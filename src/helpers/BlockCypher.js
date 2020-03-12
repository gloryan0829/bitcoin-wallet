import axios from 'axios';
const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const buffer = require('buffer');

const BLOCK_CYPHER_API_BASE_URL = 'https://api.blockcypher.com/v1';

class BlockCypher {
  constructor(coin = 'bcy', chain = 'test', token = '') {
    this.coin = coin; // 'btc', 'ltc', 'doge', or 'bcy'
    this.chain = chain; // 'main', 'test', or 'test3'
    this.token = token; // 제공 받은 API
    this.apiBaseUrl = `${BLOCK_CYPHER_API_BASE_URL}/${this.coin}/${this.chain}`;
  }

  apiCallWrapper(path, method = 'get', payload = {}, options) {
    const { timeout, withCredentials, responseType, headers } = options || {};

    let config = {
      url: `${this.apiBaseUrl}${path}?token=${this.token}`,
      method,
      timeout: timeout || 10000, // 10초 timeout
      withCredentials: withCredentials || false, // CORS 관련 설정
      responseType: responseType || 'json', // response Type default : JSON,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };

    if (headers) {
      config = {
        ...config,
        headers: { ...config.headers, ...options.headers },
      };
    }
    if (payload) config[method === 'post' ? 'data' : 'params'] = payload;

    console.log(` BlockCypher API 요청 >> ${config['url']}`);
    return axios(config);
  }

  getChain() {
    return this.apiCallWrapper('/', 'get', {});
  }

  getAddressInfo(address, detail = false) {
    return this.apiCallWrapper(
      `/addrs/${address}${detail ? '/full' : ''}`,
      'get',
      {},
    );
  }

  newWallet() {
    return this.apiCallWrapper(`/addrs`, 'post');
  }

  balanceOf(address) {
    return this.apiCallWrapper(`/addrs/${address}`, 'get');
  }

  faucet(address, amount) {
    return this.apiCallWrapper(`/faucet`, 'post', { address, amount });
  }

  getTxInfo(txHash) {
    return this.apiCallWrapper(`/txs/${txHash}`, 'get');
  }

  makeTx(from, to, amount) {
    const payload = {
      inputs: [
        {
          addresses: [from],
        },
      ],
      outputs: [
        {
          addresses: [to],
          value: amount,
        },
      ],
    };

    return this.apiCallWrapper(`/txs/new`, 'post', payload);
  }

  signTx(tosign, pubKey, privKey) {
    const key = new bitcoin.ECPair(bigi.fromHex(privKey));
    const pubkeys = [];
    const signatures = [];
    for (let data of tosign) {
      const signature = key
        .sign(new buffer.Buffer(data, 'hex'))
        .toDER()
        .toString('hex');
      signatures.push(signature);
      pubkeys.push(pubKey);
    }
    return { tosign, pubkeys, signatures };
  }

  sendSignedTx(signedTx) {
    return this.apiCallWrapper(`/txs/send`, 'post', signedTx);
  }
}

export default BlockCypher;
