// https://pm2.keymetrics.io/docs/tutorials/using-transpilers-with-pm2#babel-1
// esm 옵션을 사용할 경우 정상 동작 하지 않아서,pm2에서 가이드 하는 방식을 사용
// TODO: 프로덕션 환경에서는 build 하는 방식으로 변경해야 됨

require('@babel/register');
require('./index.es6');
