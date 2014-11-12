var restify = require('restify'),
    tester = require('./tester'),
    async = require('async');

var server = restify.createServer({
    name: 'CipherTokenPerformanceTestingServer',
    version: '0.0.1'
});

const DEFAULT_TIMES = 300;
const DEFAULT_ITERATIONS = 3;

server.use(restify.bodyParser({ mapParams: false }));

server.post("/start", function(req, res, next) {

    async.parallel([
        function(){
            var startingTimes = setStartingTimes(req);
            var iterations = setIterations(req);

            tester.runTests(startingTimes, iterations);
        },
        function(){
            res.send(200, 'Performance tests in progress');
            return next();
        }
    ]);
});

server.get("/outCome", function (req, res, next) {
    var body = tester.getResultsFromAllPerfTests();

    res.send(200, body);
    return next();
});

server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});


function setStartingTimes(req) {
    var startingTimes = '';
    if (typeof req.body !== 'undefined' && typeof req.body.startingTimes !== 'undefined' && req.body.startingTimes !== null) {
        startingTimes = req.body.startingTimes;
    } else {
        startingTimes = DEFAULT_TIMES;
    }
    return startingTimes;
}

function setIterations(req) {
    var iterations = '';
    if (typeof req.body !== 'undefined' && typeof req.body.iterations !== 'undefined' && req.body.iterations !== null) {
        iterations = req.body.iterations;
    } else {
        iterations = DEFAULT_ITERATIONS;
    }
    return iterations;
}