var restify = require('restify');
var tester = require('./tester');

var server = restify.createServer({
    name: 'CipherTokenPerformanceTestingServer',
    version: '0.0.1'
});

server.use(restify.bodyParser({ mapParams: false }));


server.post("/start", function(req, res, next) {
    var startingTimes = req.body.startingTimes || 300;
    var iterations = req.body.iterations || 3;

    tester.runTests(startingTimes, iterations);
    var body = tester.getResultsFromAllPerfTests();

    res.send(200, body);
    return next();
});

server.get("/outCome", function (req, res, next) {
    var body = tester.getResultsFromAllPerfTests();

    res.send(200, body);
    return next();
});

server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
