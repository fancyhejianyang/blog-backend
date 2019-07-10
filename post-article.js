const auth = require('./auth');
const postArticle = function (req, response) {
  //获取请求参数
  var params = req.body.params;
  auth((err, res) => {
    if (err) throw err;
    var dbo = db.db('blog');
    // 查询是否重复文章
    var arc_id;
    dbo.collection('myBlog').find()
      .sort({
        "date": -1
      }).toArray(function (err, res) {
        console.log('输出结果：');
        console.log(res);
        arc_id = (res[0] && res[0]['arc_id']) ? res[0]['arc_id'] + 1 : 1;
        dbo.collection('myBlog').insertOne({
          ...params,
          date: new Date().getTime(),
          postDate: new Date().toLocaleDateString(),
          arc_id: arc_id,
          views: 0
        }, function (err, res) {
          if (err) throw err;
          response.json({
            result: 'success',
            code: '1',
            msg: '发表成功！',
            data: {}
          });
          db.close();
        })
      })
  });
}
module.exports = postArticle;