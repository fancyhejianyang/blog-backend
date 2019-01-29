const dbConfig = require('./mongodb.config').DbConfig;
const mode = require('./mongodb.config').mode;
const MongoClient = require('mongodb').MongoClient;
const getArticleList = function (req, response) {
  console.log(req.query);
  const [pageSize, pageIndex, type] = [req.query.pageSize, req.query.pageIndex, req.query.type];
  console.log('limit:' + pageSize);
  console.log('序号范围:' + Number(pageSize) * (Number(pageIndex) - 1) + 1 + '-' + Number(pageSize) * Number(pageIndex));
  MongoClient.connect(dbConfig[mode]['url'], {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    console.log('数据库已经建立');
    var dbo = db.db('blog');
    // 查询 + 筛选
    var condition;
    if (type === 'all') {
      condition = {};
    } else {
      condition = {
        type: type
      }
    }
    dbo.collection('myBlog').find(condition).sort({
        date: -1
      }).skip(Number(pageSize) * (Number(pageIndex) - 1))
      .limit(Number(pageSize)).toArray(function (err, res) {
        console.log('查询结果：');
        if (err) throw err;
        if (res) {
          response.json({
            result: 'success',
            code: '1',
            msg: '获取列表成功！',
            data: res
          });
        }
      });
    db.close();
  })
}
module.exports = getArticleList;