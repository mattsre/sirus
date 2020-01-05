import http, { IncomingMessage, ServerResponse } from "http";

const hostname = "127.0.0.1";
const port = 3000;

class SirusServer {
  routes: Map<string, Function>;
  server: http.Server;

  constructor() {
    this.routes = new Map<string, Function>();
    this.server = http.createServer((req, res) => {
      const path = req.url;
      const handler = this.routes.get(path);
      if (handler !== undefined) {
        handler(req, res);
      } else {
        this.notFoundHandler(req, res);
      }
    });
  }

  public register(path: string, handler: Function) {
    this.routes.set(path, handler);
  }

  public listen(port: number, hostname: string) {
    this.server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }

  private notFoundHandler(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found");
  }
}

const rootHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("Hello, routing!\n");
};

const server = new SirusServer();

server.register("/hello", rootHandler);
server.register("/todo", (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("Todo route\n");
});

server.listen(port, hostname);
