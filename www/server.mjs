import { readFile } from "node:fs";
import { createServer } from "node:http";
import { join } from "node:path";

const __dirname = import.meta.dirname;
const host = "localhost";
const port = 8000;

const contentTypes = {
  ".wasm": "application/wasm",
  ".js": "application/javascript",
  ".css": "text/css",
  ".html": "text/html",
};

// Generic file serving function
const serveFile = (filePath, res, defaultErrorMessage = "File not found") => {
  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end(defaultErrorMessage);
    }

    const ext = filePath.substring(filePath.lastIndexOf("."));
    const contentType = contentTypes[ext] || "text/plain";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
};

createServer((req, res) => {
  // Check if the request is for the root/home page
  if (req.url === "/") {
    serveFile(join(__dirname, "index.html"), res, "Error loading index.html");
  } else {
    const ext = req.url.substring(req.url.lastIndexOf("."));
    if (contentTypes[ext]) {
      serveFile(join(__dirname, req.url), res);
    } else {
      res.writeHead(404);
      res.end("Page not found");
    }
  }
}).listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
