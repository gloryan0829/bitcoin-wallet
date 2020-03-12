// import bitcoin from 'bitcoinjs-lib';
const bitcoin = require("bitcoinjs-lib");

const networks = {
  btc: {
    main: bitcoin.networks.bitcoin,
    test3: bitcoin.networks.testnet
  },
  ltc: {
    main: bitcoin.networks.litecoin
  },
  bcy: {
    test: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x1b,
      scriptHash: 0x1f,
      wif: 0x49
    }
  }
};

test('tx sign test', async () => {
  const net = networks['bcy'].test;
  // console.log(net);
  const key = bitcoin.ECPair.fromWIF("BtLfFg6KA85Ty7LsTqdnABtTYqfnwLBd3oAEJmVD6yWsw3z4HAvq", net);
// get pubkey hash for P2WPKH
  const pubKeyHash = bitcoin.crypto.hash160(key.getPublicKeyBuffer());
// create P2WPKH for use as redeemScript
  const redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(pubKeyHash);

  const tx = new bitcoin.TransactionBuilder(net);
  const inputPrevHash = '86a9bed9c78b360d405c1f73658a03b3791673273590f7fb5723f5d5d0f9a29e';

  tx.setVersion(2);
  tx.addInput(inputPrevHash, 1);
  tx.addOutput("CAuSkQ62s6e9vgC5K3iv4b6YTfEZQMzmmp", 1000000);
// added more to the change, as "too big fee" warning was triggered
  tx.addOutput("CFAAVHdgizNhBsPnwnzejP5H1RQaD2tdgq", 62700);

// include the value of the input and the redeemScript
  tx.sign(0, key, redeemScript, null, 6999668);

  console.log(tx.build().toHex());

});
