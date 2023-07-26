var http = require("https");

var options = {
  host: "localhost",
  port: 5678,
  method: "GET",
  path: "/",
  headers: {},
  agent: false,
};

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var req = http.request(options, function (res) {
  console.log(`HEADRS: ${JSON.stringify(res.headers)}`);
  console.log(`status-code: ${res.statusCode}`);
  // res.socket.on("error", (error) => console.log(`On error => ${error}`));
  // res.on("data", (chunk) => console.log(`Chunk: ${chunk}`));
  // console.log(`Auth error: ${res.socket.authorizationError}`);
});

req.on("error", function (err) {
  console.log("error: " + err);
});

req.end();
