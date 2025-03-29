const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    //normally check karta he ki ham jo response bhej rhe he wo usin request ki he ya nhi
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello ice tea.");
  } else if (req.url === "/ice-tea") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Thanks for ordering ice tea.");
  } else {
    //basically nhi mila to 404
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening at http://${hostname}:${port}`);
});
//using this we can get from the frontend or postman as of now
