var http = require("http");


var options = {
};

var server = http.createServer(options, function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end('{"status":"approved"}');
    console.log("Approved Client ", req.socket.address());
});

server.on("error", function (err) {
  console.log("server.error: " + err);
});

server.on("listening", function () {
  console.log("Server listeining");
});

server.listen(5678);
