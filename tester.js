var tests = require('./performanceTests'),
    async = require('async');

var previousAccessTokenCreationResults = {},
    actualAccessTokenCreationResultTime = '',
    totalTimeForAccessTokenCreationTestSets = 0,
    timesAccessTokenCreationPerfTestWasRun = 0;

var previousDecodeTokenResults = {},
    actualDecodeTokenResultTime = '',
    totalTimeFordecodeTokenTestSets = 0,
    timesDecodeTokenPerfTestWasRun = 0;


exports.getResultsFromAllPerfTests = function(){
    var combinedResults = {};
    combinedResults['accessTokenCreation'] = previousAccessTokenCreationResults;
    combinedResults['decodeToken'] = previousDecodeTokenResults;

    return combinedResults;
};

exports.runTests = function(startingTimes, iterations){
    runTests(startingTimes, iterations);
};

function runAllPerfTestForAGivenTimesParam(times){ async.series([
            function (cbk) {
                // Access Tokens Creation Performance Test
                actualAccessTokenCreationResultTime = tests.accessTokensCreation11kPerfTest(times);

                var meanTime = calculateMeanTimeForAccessTokenCreation();
                previousAccessTokenCreationResults[times + ' times'] = meanTime + '(ms) mean time';

                cbk(null, previousAccessTokenCreationResults);
            },
            function (cbk) {
                // Decode Tokens Firm Performance Test
                actualDecodeTokenResultTime = tests.runDecodeTokensPerfTests(times);

                var meanTime = calculateMeanTimeForAccessTokenCheckFirm();
                previousDecodeTokenResults[times + ' times'] = meanTime + '(ms) mean time';

                cbk(null, previousDecodeTokenResults);
            }
        ]
    );
}

function calculateMeanTimeForAccessTokenCreation() {
    timesAccessTokenCreationPerfTestWasRun++;
    totalTimeForAccessTokenCreationTestSets += actualAccessTokenCreationResultTime;

    var meanTime = totalTimeForAccessTokenCreationTestSets / timesAccessTokenCreationPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}

function calculateMeanTimeForAccessTokenCheckFirm() {
    timesDecodeTokenPerfTestWasRun++;
    totalTimeFordecodeTokenTestSets += actualDecodeTokenResultTime;

    var meanTime = totalTimeFordecodeTokenTestSets / timesDecodeTokenPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}


function runTests(startingTimes, iterations) {
    async.times(5, function (n) {
        var times = startingTimes * (n + 1);
        console.log('running tests for ' + times + '(n=' + n + ')');

        actualAccessTokenCreationResultTime = '';
        totalTimeForAccessTokenCreationTestSets = 0;
        timesAccessTokenCreationPerfTestWasRun = 0;

        actualDecodeTokenResultTime = '';
        totalTimeFordecodeTokenTestSets = 0;
        timesDecodeTokenPerfTestWasRun = 0;

        async.times(iterations, function () {
                runAllPerfTestForAGivenTimesParam(times);
            }
            , function (err) {
                console.log(err);
            });
    }, function (err) {
        console.log(err);
    });
}
