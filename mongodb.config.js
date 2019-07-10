const mode = 'dev';
const DbConfig = {
  'dev': {
    url: 'mongodb://127.0.0.1:27017'
  },
  'pro': {
    url: ''
  }
};
const AdminInfo = {
  user:'fancy',
  password:'fancy',
  dbName:'blog'
}
module.exports = {
  mode,
  DbConfig,
  AdminInfo
};