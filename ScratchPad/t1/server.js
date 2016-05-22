/**
 * Created by mccaul on 5/19/16.
 */
var http = require("http");

console.log("Running a web server. \nGo to http://localhost:8888/");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Air World");
    response.end();
}).listen(8888);

