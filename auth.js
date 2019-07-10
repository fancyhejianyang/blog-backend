const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./mongodb.config').DbConfig;
const admin = require('./mongodb.config').AdminInfo;
const mode = require('./mongodb.config').mode;
const auth = function (fn) {
  MongoClient.connect(dbConfig[mode]['url'],{
    auth:{
      user:admin.user,
      password:admin.password
    },
    authMechanism:'DEFAULT',
    authSource:admin.dbName,
    useNewUrlParser:true
  },fn)
}
module.exports = auth;