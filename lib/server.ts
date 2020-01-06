import http, { IncomingMessage, ServerResponse } from "http";

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

  public listen(port: number, hostname: string, listener: () => void) {
    this.server.listen(port, hostname, listener);
  }

  private notFoundHandler(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found");
  }
}

export default SirusServer;
