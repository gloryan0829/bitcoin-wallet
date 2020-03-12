// refer to https://www.blockcypher.com/dev/bitcoin/data/samples/create-tx.html

const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const buffer = require('buffer');

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
const rootUrl = 'https://api.blockcypher.com/v1/btc/bcy';
const source = {
  "private": "9582c7c2851321b3a64e2753c378739f8fc5d8465d15dd37994923ab209f84c3",
  "public": "03ddb188ec3a37db21627a60f83fa4f9ed8c31149a162d126f1d1ab0405a4ba443",
  "address": "CFAAVHdgizNhBsPnwnzejP5H1RQaD2tdgq",
  "wif": "BtLfFg6KA85Ty7LsTqdnABtTYqfnwLBd3oAEJmVD6yWsw3z4HAvq"
};
let newTx = {
  "tx": {
    "block_height": -1,
    "block_index": -1,
    "hash": "1efc93740daaf624859ad933e858201113d6c2e11088fd8ff068ff3ac8a3fcb4",
    "addresses": [
      "CFAAVHdgizNhBsPnwnzejP5H1RQaD2tdgq",
      "CAuSkQ62s6e9vgC5K3iv4b6YTfEZQMzmmp"
    ],
    "total": 986300,
    "fees": 13700,
    "size": 119,
    "preference": "high",
    "relayed_by": "221.141.202.150",
    "received": "2020-03-12T05:13:50.62617884Z",
    "ver": 1,
    "double_spend": false,
    "vin_sz": 1,
    "vout_sz": 2,
    "confirmations": 0,
    "inputs": [
      {
        "prev_hash": "93dbd671da1899ae2d4800908bfb44e0fcb3550164aa21e74739518879d9a8fa",
        "output_index": 0,
        "output_value": 1000000,
        "sequence": 4294967295,
        "addresses": [
          "CFAAVHdgizNhBsPnwnzejP5H1RQaD2tdgq"
        ],
        "script_type": "pay-to-pubkey-hash",
        "age": 2783637
      }
    ],
    "outputs": [
      {
        "value": 10000,
        "script": "76a914c30481736a3a7dd86461796d31a1115d97238eb688ac",
        "addresses": [
          "CAuSkQ62s6e9vgC5K3iv4b6YTfEZQMzmmp"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 976300,
        "script": "76a914f1adacb38b67f5b21325a5ac793c134e2d3fce6688ac",
        "addresses": [
          "CFAAVHdgizNhBsPnwnzejP5H1RQaD2tdgq"
        ],
        "script_type": "pay-to-pubkey-hash"
      }
    ]
  },
  "tosign": [
    "c679f7ca5149918d36a316c165bd70d0d5a4bb88987e29f384effe20177fd3bb"
  ]
};

test('test', async () => {
  const key = new bitcoin.ECPair(bigi.fromHex(source.private));
  newTx.pubkeys = [];
  newTx.signatures  = newTx.tosign.map(function(tosign) {
    newTx.pubkeys.push(source.public);
    return key.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
  });
  console.log(newTx);
});

// var dest = null;
//
// // 0. We get a newly generated address
// function logAddr(addr) {
//   dest = addr;
//   log('Generated new address ' + dest.address);
// }
//
// // 1. Post our simple transaction information to get back the fully built transaction,
// //    includes fees when required.
// function newTransaction() {
//   var newtx = {
//     inputs: [{ addresses: [source.address] }],
//     outputs: [{ addresses: [dest.address], value: 25000 }],
//   };
//   return $.post(rootUrl + '/txs/new', JSON.stringify(newtx));
// }
//
// // 2. Sign the hexadecimal strings returned with the fully built transaction and include
// //    the source public address.
// function signAndSend(newtx) {
//   if (checkError(newtx)) return;
//
//   newtx.pubkeys = [];
//   newtx.signatures = newtx.tosign.map(function(tosign) {
//     newtx.pubkeys.push(source.public);
//     return key
//       .sign(new buffer.Buffer(tosign, 'hex'))
//       .toDER()
//       .toString('hex');
//   });
//   return $.post(rootUrl + '/txs/send', JSON.stringify(newtx));
// }
//
// // 3. Open a websocket to wait for confirmation the transaction has been accepted in a block.
// function waitForConfirmation(finaltx) {
//   if (checkError(finaltx)) return;
//   log(
//     'Transaction ' +
//       finaltx.tx.hash +
//       ' to ' +
//       dest.address +
//       ' of ' +
//       finaltx.tx.outputs[0].value / 100000000 +
//       ' BTC sent.',
//   );
//
//   var ws = new WebSocket('wss://socket.blockcypher.com/v1/btc/test3');
//
//   // We keep pinging on a timer to keep the websocket alive
//   var ping = pinger(ws);
//
//   ws.onmessage = function(event) {
//     if (JSON.parse(event.data).confirmations > 0) {
//       log('Transaction confirmed.');
//       ping.stop();
//       ws.close();
//     }
//   };
//   ws.onopen = function(event) {
//     ws.send(
//       JSON.stringify({ filter: 'event=new-block-tx&hash=' + finaltx.tx.hash }),
//     );
//   };
//   log('Waiting for confirmation... (may take > 10 min)');
// }
//
// function checkError(msg) {
//   if (msg.errors && msg.errors.length) {
//     log('Errors occured!!/n' + msg.errors.join('/n'));
//     return true;
//   }
// }
//
// function pinger(ws) {
//   var timer = setInterval(function() {
//     if (ws.readyState == 1) {
//       ws.send(JSON.stringify({ event: 'ping' }));
//     }
//   }, 5000);
//   return {
//     stop: function() {
//       clearInterval(timer);
//     },
//   };
// }
//
// function log(msg) {
//   $('div.log').append('<div>' + msg + '</div>');
// }
//
// // Chaining
// // $.post(rootUrl + '/addrs')
// //   .then(logAddr)
// //   .then(newTransaction)
// //   .then(signAndSend)
// //   .then(waitForConfirmation);
