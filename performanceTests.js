var ciphertoken = require('ciphertoken');

var VALID_USER_ID 	 = 'myUserId123';
var VALID_DATA       = require('./bigDataFiles/11k.json').data;

var settings = {
	cipherKey: 'myCipherKey123',
	firmKey:  'myFirmKey123'
};

exports.runTokenCreationPerfTests = function(times){
    var initialTime = new Date().getTime();

    for(var i=0; i < times; i++){
        ciphertoken.encode(settings, VALID_USER_ID, null, {}, function () {});
    }
    return new Date().getTime() - initialTime;
};

exports.accessTokensCreation11kPerfTest = function(times){
    var initialTime = new Date().getTime();

    for(var i=0; i < times; i++){
		ciphertoken.encode(settings, VALID_USER_ID, null, VALID_DATA, function () {});
    }

    return new Date().getTime() - initialTime;
};

exports.runDecodeTokensPerfTests = function (times) {
    var initialTime = new Date().getTime();

	var validToken;

	ciphertoken.encode(settings, VALID_USER_ID, null, VALID_DATA, function (err, token) {
		"use strict";
		validToken = token;
	});
    for(var i=0; i < times; i++){
		ciphertoken.decode(settings, validToken, function () {});
    }

    return new Date().getTime() - initialTime;
};
