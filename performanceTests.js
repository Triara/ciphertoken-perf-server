var ciphertoken = require('ciphertoken');

var VALID_CIPHER_KEY = 'myCipherKey123';
var VALID_FIRM_KEY 	 = 'myFirmKey123';
var VALID_USER_ID 	 = 'myUserId123';
var VALID_DATA       = require('./bigDataFiles/11k.json').data;

exports.runTokenCreationPerfTests = function(times){
    var initialTime = new Date().getTime();

    for(var i=0; i < times; i++){
        ciphertoken.create(VALID_CIPHER_KEY, VALID_FIRM_KEY);
    }
    return new Date().getTime() - initialTime;
};

exports.accessTokensCreation11kPerfTest = function(times){
    var cToken = ciphertoken.create(VALID_CIPHER_KEY, VALID_FIRM_KEY);
    var initialTime = new Date().getTime();

    for(var i=0; i < times; i++){
         cToken.createAccessToken(VALID_USER_ID, new Date().getTime(), VALID_DATA);
    }

    return new Date().getTime() - initialTime;
};

exports.runTokenCheckFirmPerfTests = function (times) {
    var cToken = ciphertoken.create(VALID_CIPHER_KEY, VALID_FIRM_KEY);
    var initialTime = new Date().getTime();
    var validAccessToken = cToken.createAccessToken(VALID_USER_ID, new Date().getTime(), VALID_DATA);

    for(var i=0; i < times; i++){
        cToken.checkAccessTokenFirm(validAccessToken);
    }

    return new Date().getTime() - initialTime;
};