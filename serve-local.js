const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 8000;
const root = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const requestedPath = decodeURIComponent(url.pathname);
  const filePath = path.join(root, requestedPath === "/" ? "index.html" : requestedPath);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(resolvedPath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const contentType = mimeTypes[path.extname(resolvedPath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`Site local: http://localhost:${port}`);
  console.log("Ctrl+C pour arrêter le serveur.");
});
