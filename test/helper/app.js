var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);
var app = require('../../server.js');
module.exports = app;