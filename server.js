//模拟RESTFUL
const postArticle = require('./post-article');
const getArticleList = require('./get-article-list');
const getArticle = require('./get-article');
const authLogin = require('./login');
var express = require('express');
var regist = require('./registe');
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
app.post('/regist',regist);
app.post('/login',authLogin);
//获取列表
app.get('/getArcticlesByType', getArticleList);
// 提交发表
app.post('/blog', postArticle);
//获取文章
app.get('/getArticle', getArticle)


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})