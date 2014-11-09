var CronJob = require('cron').CronJob;
var tests = require('./performanceTests');

var previousTokenCreationResults = {};
var actualTokenCreationResultTime = '';

const TIMES = 10000;

exports.getTokenCreationTestResults = function(){
    return previousTokenCreationResults;
};

// Private
var ScheduleTokenCreationTests = new CronJob({
    cronTime: '0 * * * * *', // every minute
    onTick: function() {
        actualTokenCreationResultTime = tests.runTokenCreationPerfTests(TIMES);
        previousTokenCreationResults[TIMES + ' token creations'] = actualTokenCreationResultTime;
        console.log(previousTokenCreationResults);
    },
    start: true,
    timeZone: "America/Los_Angeles"
});
