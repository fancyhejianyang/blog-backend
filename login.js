const dbConfig = require('./mongodb.config').DbConfig;
const mode = require('./mongodb.config').mode;
const MongoClient = require('mongodb').MongoClient;
const authLogin = function (req, response) {
  //获取请求参数
  var params = req.body.params;
  console.log(params);
  response.json({
    result: 'success',
    code: '1',
    msg: '发表成功！',
    data: {}
  })
};
module.exports = authLogin;