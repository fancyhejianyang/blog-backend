const auth = require('./auth');
const regist = function (req, response) {
  //获取请求参数
  var params = req.body.params;
  // console.log(params);
  // 链接数据库 认证
  auth((err, db) => {
    if (err) throw err;
    var dbo = db.db('blog');
    // 从客户端传来的用户名和密码
    var userInfo = {
      nickName: params.userName,
      passWord: params.passWord
    };
    dbo.collection('users').find({ nickName: userInfo.nickName }).toArray(function (err, res) {
      if (err) throw err;
      console.log(res.length === 0);
      if (res && res.length === 0) {
        dbo.collection('users').insertOne({
          ...userInfo,
          registrationDate: new Date(),
          city: params.city,
          ip: params.ip
        }, function (err, res) {
          if (err) throw err;
          response.json({
            result: 'success',
            code: '1',
            data: {
              msg: '注册成功'
            }
          })
        })
      } else if (res && res.length === 1) {
        response.json({
          result: 'success',
          code: '1',
          data: {
            msg: '用户名已被注册'
          }
        });
      }
    });
    db.close();
  });
};
module.exports = regist;