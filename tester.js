var tests = require('./performanceTests'),
    async = require('async');

var previousCipherTokenCreationResults = {},
    actualCipherTokenCreationResultTime = '',
    totalTimeForCipherTokenCreationTestSets = 0,
    timesCipherTokenCreationPerfTestWasRun = 0;

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
    combinedResults['cipherTokenCreation'] = previousCipherTokenCreationResults;
    combinedResults['accessTokenCreation'] = previousAccessTokenCreationResults;
    combinedResults['decodeToken'] = previousDecodeTokenResults;

    return combinedResults;
};

exports.runTests = function(startingTimes, iterations){
    runTests(startingTimes, iterations);
};

function runAllPerfTestForAGivenTimesParam(times){ async.series([
            function (cbk) {
                // CipherToken Creation Performance Test
                actualCipherTokenCreationResultTime = tests.runTokenCreationPerfTests(times);

                var meanTime = calculateMeanTimeForCipherTokenCreation();
                previousCipherTokenCreationResults[times + ' times'] = meanTime + '(ms) mean time';

                cbk(null, previousCipherTokenCreationResults);
            },
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
function calculateMeanTimeForCipherTokenCreation() {
    timesCipherTokenCreationPerfTestWasRun++;
    totalTimeForCipherTokenCreationTestSets += actualCipherTokenCreationResultTime;

    var meanTime = totalTimeForCipherTokenCreationTestSets / timesCipherTokenCreationPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
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
    async.times(5, function (n, next) {
        var times = startingTimes * (n + 1);
        console.log('running tests for ' + times + '(n=' + n + ')');

        actualCipherTokenCreationResultTime = '';
        totalTimeForCipherTokenCreationTestSets = 0;
        timesCipherTokenCreationPerfTestWasRun = 0;

        actualAccessTokenCreationResultTime = '';
        totalTimeForAccessTokenCreationTestSets = 0;
        timesAccessTokenCreationPerfTestWasRun = 0;

        actualDecodeTokenResultTime = '';
        totalTimeFordecodeTokenTestSets = 0;
        timesDecodeTokenPerfTestWasRun = 0;

        async.times(iterations, function (m, next) {
                runAllPerfTestForAGivenTimesParam(times);
            }
            , function (err) {
                console.log(err);
            });
    }, function (err) {
        console.log(err);
    });
}
