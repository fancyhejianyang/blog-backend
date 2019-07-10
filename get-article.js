const auth = require('./auth');
const getArticle = function (req, response) {
  const arcid = req.query['arc_id'];
  auth((err,res)=>{
    if (err) throw err;
    var dbo = db.db('blog');
    // 查询条件 id 
    dbo.collection('myBlog').find({
      "arc_id": Number(arcid)
    }).toArray(function (err, res) {
      if (err) throw err;
      if (res.length && res.length > 0) {
        response.json({
          result: 'success',
          code: '1',
          msg: '获取文章成功',
          data: res
        })
      }else{
        response.json({
          result: 'failed',
          code: '0',
          msg: '获取文章失败',
          data: res
        })
      }
    })
  })
}
module.exports = getArticle;