const lib = require('./lib');
const auth = require('./auth');
const authLogin = function (req, response) {
  //获取请求参数
  var params = req.body.params;
  auth((err, db) => {
    if (err) throw err;
    var dbo = db.db('blog');
    //从客户端传过来的参数
    var userInfo = {
      nickName: params.userName,
      passWord: params.passWord
    };
    dbo.collection('users').find({ nickName: userInfo.nickName, passWord: userInfo.passWord })
      .toArray(function (err, res) {
        if (err) throw err;
        if (res && res.length === 1) {
          var token = lib.produceJwt({
            nickName:userInfo.nickName
          });
          response.json({
            result: 'success',
            code: '1',
            loginInfo: {
              'm_session_id': token,
              'userName': userInfo.nickName
            },
            data: {
              msg: '登录成功',
            }
          })
        } else if (res.length === 0) {
          response.json({
            result: 'failed',
            code: '0',
            data: {
              msg: '账号或者密码错误'
            }
          })
        }
      })
  })
};
module.exports = authLogin;