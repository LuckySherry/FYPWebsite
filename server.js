/**
 * Created by Wang Xinyu on 2014/4/21.
 */
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(1122);
    console.log("Server has started.");
}

exports.start = start;