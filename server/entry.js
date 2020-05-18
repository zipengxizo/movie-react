
require('babel-register')({
    presets:["env","react"]
});
require('babel-polyfill');
module.exports = require('./index');
