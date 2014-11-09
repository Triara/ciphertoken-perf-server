var ciphertoken = require('ciphertoken');

var VALID_CIPHER_KEY = 'myCipherKey123';
var VALID_FIRM_KEY 	 = 'myFirmKey123';

exports.runTokenCreationPerfTests = function(times){
    var initialTime = new Date().getTime();

    for(var i=0; i < times; i++){
        ciphertoken.create(VALID_CIPHER_KEY,VALID_FIRM_KEY);
    }
    var result = new Date().getTime() - initialTime;

    return result;
};
