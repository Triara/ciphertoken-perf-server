var CronJob = require('cron').CronJob;
var tests = require('./performanceTests');

var previousTokenCreationResults = {};
var actualTokenCreationResultTime = '';
var totalTimeforAllTestSets = 0;
var timesTestWasRun = 0;

const TIMES = 10000;

exports.getTokenCreationTestResults = function(){
    return previousTokenCreationResults;
};

// Private

var ScheduleTokenCreationTests = new CronJob({
    cronTime: '0 * * * * *', // every minute
    onTick: function() {
        actualTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);

        var meanTime = calculateMeanTimeForTokenCreation();
        previousTokenCreationResults[TIMES + ' token creations'] = actualTokenCreationResultTime;
        previousTokenCreationResults['Mean time (ms) for ' + TIMES + ' token creations until now'] = meanTime;
        console.log(previousTokenCreationResults);
    },
    start: true,
    timeZone: "America/Los_Angeles"
});

function calculateMeanTimeForTokenCreation() {
    timesTestWasRun++;
    totalTimeforAllTestSets += actualTokenCreationResultTime;
    var meanTime = totalTimeforAllTestSets / timesTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}