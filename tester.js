var CronJob = require('cron').CronJob;
var tests = require('./performanceTests');

const TIMES = 10000;

exports.getCipherTokenCreationTestResults = function(){
    return previousCipherTokenCreationResults;
};

exports.getAccessTokenCreationTestResults = function(){
    return
}

// CipherToken Creation Performance Test Schedule
var previousCipherTokenCreationResults = {};
var actualCipherTokenCreationResultTime = '';
var totalTimeForCipherTokenCreationTestSets = 0;
var timesCipherTokenCreationPerfTestWasRun = 0;

var scheduleCipherTokenCreationTests = new CronJob({
    cronTime: '0 * * * * *', // every minute
    onTick: function() {
        actualCipherTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);

        var meanTime = calculateMeanTimeForCipherTokenCreation();
        previousCipherTokenCreationResults[TIMES + ' token creations'] = actualCipherTokenCreationResultTime;
        previousCipherTokenCreationResults['Mean time (ms) for ' + TIMES + ' token creations until now'] = meanTime;
    },
    start: true,
    timeZone: "America/Los_Angeles"
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
    cronTime: '0 * * * * *', // every minute
    onTick: function() {
        actualAccessTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);

        var meanTime = calculateMeanTimeForAccessTokenCreation();
        previousAccessTokenCreationResults[TIMES + ' token creations'] = actualAccessTokenCreationResultTime;
        previousAccessTokenCreationResults['Mean time (ms) for ' + TIMES + ' access token creations until now'] = meanTime;
        console.log(previousAccessTokenCreationResults);
    },
    start: true,
    timeZone: "America/Los_Angeles"
});

function calculateMeanTimeForAccessTokenCreation() {
    timesAccessTokenCreationPerfTestWasRun++;
    totalTimeForAccessTokenCreationTestSets += actualAccessTokenCreationResultTime;
    var meanTime = totalTimeForAccessTokenCreationTestSets / timesAccessTokenCreationPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}