/**
 * Created by Wang Xinyu on 2014/4/21.
 */
var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");

    var indexPath = "./index.html";
    response.writeHead(200, {"Content-Type": "text/html"});

   fs.readFile(indexPath,function(err,data){
        response.end(data)
    });
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+
        querystring.parse(postData).text);
    response.end();
}

function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;