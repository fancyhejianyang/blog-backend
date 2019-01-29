//模拟RESTFUL
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json  
app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  res.header('Content-Type', 'application/json;charset=utf-8');
  // res.header('Content-Type', 'application/x-www-form-urlencoded');
  next();
});
app.get('/getArcticlesByType', function (req, response) {
  console.log(req.query);
  const [pageSize, pageIndex, type] = [req.query.pageSize, req.query.pageIndex, req.query.type];
  console.log('limit:' + pageSize);
  console.log('序号范围:' + Number(pageSize) * (Number(pageIndex) - 1) + 1 + '-' + Number(pageSize) * Number(pageIndex));
  MongoClient.connect(url, function (err, db) {
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

});
app.post('/blog', function (req, response) {
  console.log(req.body.params);
  var params = req.body.params;
  // 链接数据库
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已经建立');
    var dbo = db.db('blog');
    // 查询是否文章名重复
    dbo.collection('myBlog').find({
      "arc_title": params.arc_title
    }).toArray(function (err, res) {
      console.log('查询结果：');
      console.log(res);
      if (res.length > 0) {
        response.json({
          result: 'success',
          code: '0',
          msg: '文章标题重复！',
          data: {}
        });
      } else {
        dbo.collection('myBlog').insertOne({ ...params,
          date: new Date().getTime(),
          postDate: new Date().toLocaleDateString(),
          views:0
        }, function (err, res) {
          if (err) throw err;
          response.json({
            result: 'success',
            code: '1',
            msg: '发表成功！',
            data: {}
          });
          db.close();
        });
      }
    });
  })
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})