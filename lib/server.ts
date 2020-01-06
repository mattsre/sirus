import http, { IncomingMessage, ServerResponse } from "http";
import { HTTPMethod } from "./http-methods";

type Routes = Map<string, Function>;
// Map<'HTTP Method', Map<'path', 'handler func'>>;
type Router = Map<string, Routes>;

class SirusServer {
  router: Router;
  server: http.Server;

  constructor() {
    this.router = new Map<string, Routes>();
    Object.entries(HTTPMethod).forEach(([, value]) => {
      this.router.set(value, new Map<string, Function>());
    });

    this.server = http.createServer((req, res) => {
      const handler = this.matcher(req);
      if (handler !== undefined) {
        handler(req, res);
      } else {
        this.notFoundHandler(req, res);
      }
    });
  }

  /**
   * get
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public get(path: string, handler: Function) {
    this.register(path, handler, HTTPMethod.GET);
  }

  /**
   * post
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public post(path: string, handler: Function) {
    this.register(path, handler, HTTPMethod.POST);
  }

  /**
   * put
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public put(path: string, handler: Function) {
    this.register(path, handler, HTTPMethod.PUT);
  }

  /**
   * delete
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public delete(path: string, handler: Function) {
    this.register(path, handler, HTTPMethod.DELETE);
  }

  /**
   * patch
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public patch(path: string, handler: Function) {
    this.register(path, handler, HTTPMethod.PATCH);
  }

  /**
   * listen
   * @param port port number to listen on
   * @param hostname hostname to listen on
   * @param listener callback function execute on server startup
   */
  public listen(port: number, hostname: string, listener: () => void) {
    this.server.listen(port, hostname, listener);
  }

  private matcher(req: IncomingMessage): Function {
    const methodRoutes = this.router.get(req.method);
    return methodRoutes.get(req.url);
  }

  private register(path: string, handler: Function, method: HTTPMethod) {
    // TODO: Seems pretty inefficient, think about a better way of doing this
    const methodRoutes = this.router.get(method);
    methodRoutes.set(path, handler);
    this.router.set(method, methodRoutes);
  }

  private notFoundHandler(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found");
  }
}

export default SirusServer;
