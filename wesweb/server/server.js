const {createServer} = require("http");
const {createReadStream} = require("fs");
const { decode } = require("querystring");
const { updateDb } = require("./myModule");

const sendFile = (response, status, type, filepath) => {
    response.writeHead(status, {"Content-Type": type});
    createReadStream(filepath).pipe(response);
};

createServer((request, response) => {
    if (request.method === "POST") {
        let body = "";
        request.on("data", data => {
          body += data;
        });
        request.on("end", () => {
          const { name, email, message } = decode(body);
          updateDb(email, name, message);
          console.log(`email: ${email}, name: ${name}, message:${message}`);
        });
      }
    
    switch (request.url) {
        case "/":
            return sendFile(response, 200, "text/html", "./CSS 3 test.html");
        case "/CSS%203%20test.css":
            return sendFile(response, 200, "text/css", "./CSS 3 test.css");
        case "/dsIII.jpg":
            return sendFile(response, 200, "img/jpg", "./dsIII.jpg");
        case "/doge2.png":
            return sendFile(response, 200, "img/png", "./doge2.png");
        case "/windowsxp.jpg":
            return sendFile(response, 200, "img/jpg", "./windowsxp.jpg");
        default:
            sendFile(response, 200, "ERROR404.html");
    }
}).listen(8080);