import { readFile } from "node:fs";
import { createServer } from "node:http";
import { join } from "node:path";

const __dirname = import.meta.dirname;
const host = "localhost";
const port = 8000;

createServer((req, res) => {
  // Check if the request is for the root/home page
  if (req.url === "/") {
    // Read the index.html file
    readFile(join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading index.html");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url.endsWith(".wasm")) {
    readFile(join(__dirname, req.url), (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("WASM file not found");
      }
      res.writeHead(200, { "Content-Type": "application/wasm" });
      res.end(data);
    });
  } else if (req.url.endsWith(".js")) {
    readFile(join(__dirname, req.url), (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("JS file not found");
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  } else {
    // For any other URLs, respond with a 404 (Not Found) status code
    res.writeHead(404);
    res.end("Page not found");
  }
}).listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
