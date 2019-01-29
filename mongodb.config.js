const mode = 'dev';
const DbConfig = {
  'dev': {
    url: 'mongodb://127.0.0.1:27017'
  },
  'pro': {
    url: ''
  }
};
module.exports = {
  mode,
  DbConfig
};