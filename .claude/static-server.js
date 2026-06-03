// Minimal dependency-free static file server for local preview only.
// Not part of the website. Serves the project root on the given port.
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = process.env.PORT || 8000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".webp": "image/webp",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.join(root, urlPath);

  // Prevent path traversal outside root
  if (!filePath.startsWith(root)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log(`Preview server on http://localhost:${port}`));
