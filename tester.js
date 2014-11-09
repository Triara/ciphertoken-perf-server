var CronJob = require('cron').CronJob;
var underscore = require('underscore');
var tests = require('./performanceTests');

const TIMES = 10000;
const TIME_ZONE = "America/Los_Angeles";


exports.getCipherTokenCreationTestResults = function(){
    return previousCipherTokenCreationResults;
};

exports.getAccessTokenCreationTestResults = function(){
    return previousAccessTokenCreationResults;
};

exports.getResultsFromAllPerfTests = function(){
    return underscore.extend(previousCipherTokenCreationResults, previousAccessTokenCreationResults);
};

// CipherToken Creation Performance Test Schedule
var previousCipherTokenCreationResults = {};
var actualCipherTokenCreationResultTime = '';
var totalTimeForCipherTokenCreationTestSets = 0;
var timesCipherTokenCreationPerfTestWasRun = 0;
var scheduleCipherTokenCreationTests = new CronJob({
    cronTime: '* * * * * *', // every minute
    onTick: function() {
        actualCipherTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);

        var meanTime = calculateMeanTimeForCipherTokenCreation();
        previousCipherTokenCreationResults[TIMES + ' cipherToken creations created in'] = actualCipherTokenCreationResultTime + '(ms)';
        previousCipherTokenCreationResults['Mean time for ' + TIMES + ' token creations until now'] = meanTime + '(ms)';
    },
    start: true,
    timeZone: TIME_ZONE
});

function calculateMeanTimeForCipherTokenCreation() {
    timesCipherTokenCreationPerfTestWasRun++;
    totalTimeForCipherTokenCreationTestSets += actualCipherTokenCreationResultTime;
    var meanTime = totalTimeForCipherTokenCreationTestSets / timesCipherTokenCreationPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}

// Access Tokens Creation Performance Test Schedule
var previousAccessTokenCreationResults = {};
var actualAccessTokenCreationResultTime = '';
var totalTimeForAccessTokenCreationTestSets = 0;
var timesAccessTokenCreationPerfTestWasRun = 0;

var scheduleAccessTokenCreationTests = new CronJob({
    cronTime: '* * * * * *', // every minute
    onTick: function() {
        actualAccessTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);

        var meanTime = calculateMeanTimeForAccessTokenCreation();
        previousAccessTokenCreationResults[TIMES + ' accessToken creations created in'] = actualAccessTokenCreationResultTime + '(ms)';
        previousAccessTokenCreationResults['Mean time for ' + TIMES + ' access token creations until now'] = meanTime + '(ms)';
    },
    start: true,
    timeZone: TIME_ZONE
});

function calculateMeanTimeForAccessTokenCreation() {
    timesAccessTokenCreationPerfTestWasRun++;
    totalTimeForAccessTokenCreationTestSets += actualAccessTokenCreationResultTime;
    var meanTime = totalTimeForAccessTokenCreationTestSets / timesAccessTokenCreationPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}