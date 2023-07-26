var https = require("https");
var fs = require("fs");

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var options = {
  key: fs.readFileSync("ssl/server1.key"),
  cert: fs.readFileSync("ssl/server1.pem"),
  requestCert: true,
  ca: fs.readFileSync("ssl/ca.pem"),
};

var server = https.createServer(options, function (req, res) {
  if (req.client.authorized) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end('{"status":"approved"}');
    console.log("Approved Client ", req.socket.address());
  } else {
    console.log(
      "res.connection.authroizationError:  " + res.socket.authorizationError
    );
    res.writeHead(403, { "Content-Type": "application/json", "authError": res.socket.authorizationError });
    res.end('{"status":"denied"}');
    console.log("Denied Client ", req.socket.address());
  }
});

server.on("error", function (err) {
  console.log("server.error: " + err);
});

server.on("listening", function () {
  console.log("Server listeining");
});

server.listen(5678);
