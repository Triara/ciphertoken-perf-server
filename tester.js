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

var previousAccessTokenCheckFirmResults = {},
    actualAccessTokenCheckFirmResultTime = '',
    totalTimeForAccessTokenCheckFirmTestSets = 0,
    timesAccessTokenCheckFirmPerfTestWasRun = 0;


exports.getResultsFromAllPerfTests = function(){
    var combinedResults = {};
    combinedResults['cipherTokenCreation'] = previousCipherTokenCreationResults;
    combinedResults['accessTokenCreation'] = previousAccessTokenCreationResults;
    combinedResults['accessTokenCheckFirm'] = previousAccessTokenCheckFirmResults;

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
                // Access Tokens Check Firm Performance Test
                actualAccessTokenCheckFirmResultTime = tests.runTokenCheckFirmPerfTests(times);

                var meanTime = calculateMeanTimeForAccessTokenCheckFirm();
                previousAccessTokenCheckFirmResults[times + ' times'] = meanTime + '(ms) mean time';

                cbk(null, previousAccessTokenCheckFirmResults);
            }
        ]
    );
};
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
    timesAccessTokenCheckFirmPerfTestWasRun++;
    totalTimeForAccessTokenCheckFirmTestSets += actualAccessTokenCheckFirmResultTime;

    var meanTime = totalTimeForAccessTokenCheckFirmTestSets / timesAccessTokenCheckFirmPerfTestWasRun;
    meanTime = Number(meanTime).toFixed(2);
    return meanTime;
}


function runTests(startingTimes, iterations) {
    async.times(5, function (n, next) {
        console.log(n);
        var times = startingTimes * (n + 1);

        actualCipherTokenCreationResultTime = '';
        totalTimeForCipherTokenCreationTestSets = 0;
        timesCipherTokenCreationPerfTestWasRun = 0;

        actualAccessTokenCreationResultTime = '';
        totalTimeForAccessTokenCreationTestSets = 0;
        timesAccessTokenCreationPerfTestWasRun = 0;

        actualAccessTokenCheckFirmResultTime = '';
        totalTimeForAccessTokenCheckFirmTestSets = 0;
        timesAccessTokenCheckFirmPerfTestWasRun = 0;

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
