/**
 * Created by Wang Xinyu on 2014/4/21.
 */
var fs = require('fs');
var path = require('path');

function route(handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else if(pathname.length>0) {
        var ext = path.extname(pathname);
        var localPath = pathname;
        if(ext.length>0){
            localPath = __dirname + pathname;
        }
        fs.readFile(localPath, "binary", function (error, file) {
            if (error) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Server Error:" + error);
            } else {
                response.writeHead(200, { "Content-Type": getContentTypeByExt(ext) });
                response.end(file, "binary");
            }
        });
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
    }
}
function getContentTypeByExt(ext) {
    ext = ext.toLowerCase();
    if (ext === '.htm' || ext === '.html')
        return 'text/html';
    else if (ext === '.js')
        return 'application/x-javascript';
    else if (ext === '.css')
        return 'text/css';
    else if (ext === '.jpe' || ext === '.jpeg' || ext === '.jpg')
        return 'image/jpeg';
    else if (ext === '.png')
        return 'image/png';
    else if (ext === '.ico')
        return 'image/x-icon';
    else if (ext === '.zip')
        return 'application/zip';
    else if (ext === '.doc')
        return 'application/msword';
    else if (ext === 'pdf')
        return 'application/pdf';
    else
        return 'text/plain';
}

exports.route = route;