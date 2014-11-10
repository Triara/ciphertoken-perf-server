var CronJob = require('cron').CronJob;
var tests = require('./performanceTests');

const TIMES = 1000;
const TIME_ZONE = "America/Los_Angeles";


exports.getCipherTokenCreationTestResults = function(){
    return previousCipherTokenCreationResults;
};

exports.getAccessTokenCreationTestResults = function(){
    return previousAccessTokenCreationResults;
};

exports.getAccessTokenCheckFirmTestResults = function(){
    return previousAccessTokenCheckFirmResults;
};

exports.getResultsFromAllPerfTests = function(){
    var combinedResults = {};
    combinedResults['cipherTokenCreation'] = previousCipherTokenCreationResults;
    combinedResults['accessTokenCreation'] = previousAccessTokenCreationResults;
    combinedResults['accessTokenCheckFirm'] = previousAccessTokenCheckFirmResults;

    return combinedResults;
};

// CipherToken Creation Performance Test Schedule
var previousCipherTokenCreationResults = {},
    actualCipherTokenCreationResultTime = '',
    totalTimeForCipherTokenCreationTestSets = 0,
    timesCipherTokenCreationPerfTestWasRun = 0;

var scheduleCipherTokenCreationTests = new CronJob({
    cronTime: '* * * * * *', // every minute
    onTick: function() {
        actualCipherTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);

        var meanTime = calculateMeanTimeForCipherTokenCreation();
        previousCipherTokenCreationResults[TIMES + ' times'] = meanTime + '(ms) mean time';
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
var previousAccessTokenCreationResults = {},
    actualAccessTokenCreationResultTime = '',
    totalTimeForAccessTokenCreationTestSets = 0,
    timesAccessTokenCreationPerfTestWasRun = 0;

var scheduleAccessTokenCreationTests = new CronJob({
    cronTime: '* * * * * *', // every minute
    onTick: function() {
        actualAccessTokenCreationResultTime = tests.accessTokensCreation11kPerfTest(TIMES);

        var meanTime = calculateMeanTimeForAccessTokenCreation();
        previousAccessTokenCreationResults[TIMES + ' times'] = meanTime + '(ms) mean time';
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

// Access Tokens Check Firm Performance Test Schedule
var previousAccessTokenCheckFirmResults = {},
    actualAccessTokenCheckFirmResultTime = '',
    totalTimeForAccessTokenCheckFirmTestSets = 0,
    timesAccessTokenCheckFirmPerfTestWasRun = 0;

var scheduleAccessTokenCheckFirmTests = new CronJob({
    cronTime: '* * * * * *', // every minute
    onTick: function() {
        actualAccessTokenCheckFirmResultTime = tests.runTokenCheckFirmPerfTests(TIMES);

        var meanTime = calculateMeanTimeForAccessTokenCheckFirm();
        previousAccessTokenCheckFirmResults[TIMES + ' times'] = meanTime + '(ms) mean time';
    },
    start: true,
    timeZone: TIME_ZONE
});

function calculateMeanTimeForAccessTokenCheckFirm() {
    timesAccessTokenCheckFirmPerfTestWasRun++;
    totalTimeForAccessTokenCheckFirmTestSets += actualAccessTokenCheckFirmResultTime;

    var meanTime = totalTimeForAccessTokenCheckFirmTestSets / timesAccessTokenCheckFirmPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}
