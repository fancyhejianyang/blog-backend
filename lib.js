var jwt = require('jsonwebtoken');
const secret = '1hejianyang1'.charCodeAt().toString();
var produceUid = function (name) {
  var time = new Date().getTime();
  var random = Math.random(1, 1000);
  return String(time).slice(-8, -1) + name.charCodeAt();
}
var produceJwt = function (playload) {

  return jwt.sign(playload, secret, { expiresIn: '3h' })
}
var verifyJwt = function (token) {
  var rst;
  jwt.verify(token, secret, function (err, result) {
    console.log('secret',secret);
    console.log(result);
    rst = result;
  });
  return rst;
}
module.exports = {
  produceUid: produceUid,
  produceJwt: produceJwt,
  verifyJwt: verifyJwt
};