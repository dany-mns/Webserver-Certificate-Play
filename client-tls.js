var https = require("https");
var fs = require("fs");

var options = {
  host: "localhost",
  port: 5678,
  method: "GET",
  path: "/",
  headers: {},
  agent: false,
  key: fs.readFileSync("ssl/client1.key"),
  cert: fs.readFileSync("ssl/client1.pem"),
  ca: fs.readFileSync("ssl/ca.pem"),
};

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var req = https.request(options, function (res) {
  console.log(`HEADRS: ${JSON.stringify(res.headers)}`);
  console.log(`status-code: ${res.statusCode}`);
  res.socket.on("error", (error) => console.log(`On error => ${error}`));
  res.on("data", (chunk) => console.log(`Chunk: ${chunk}`));
  console.log(`Auth error: ${res.socket.authorizationError}`);
});

req.on("error", function (err) {
  console.log("error: " + err);
});

req.end();
