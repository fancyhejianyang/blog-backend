const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('数据库已经建立!');
  var dbo = db.db("runoob");
  
  // dbo.collection("blog").aggregate([{
  //   $lookup: {
  //     from: 'other',
  //     localField: 'writer',
  //     foreignField: 'writer',
  //     as: 'ws'
  //   }
  // }]).toArray(function (err, res) {
  //   if (err) throw err;
  //   console.log(JSON.stringify(res));
  // });
  // db.db("runoob").collection("blog").find().limit(2).toArray(function(err,res){
  //   console.log(res);
  // })
  // db.db("runoob").collection("blog").insertMany([{
  //   "writer":'Gulong',
  //   "book_name":"绝代双骄"
  // }],function(err,res){
  //   if(err) throw err;
  //   console.log("数据插入成功");
  //   console.log(res);
  // })
  db.close();
})