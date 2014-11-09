var restify = require('restify');
var tester = require('./tester');

var server = restify.createServer({
    name: 'CipherTokenPerformanceTestingServer',
    version: '0.0.1'
});

server.get("/", function (req, res, next) {
    var body = tester.getTokenCreationTestResults();

    res.send(200, body);
    return next();
});

server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
