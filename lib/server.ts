import http, { IncomingMessage, ServerResponse } from "http";
import { RouteHTTPMethods } from "./internals/http-methods";
import Router, { UserRouteType } from "./internals/router";
import Matcher from "./internals/matcher";
import { SirusRequest } from "./internals/request";
import { SirusResponse } from "./internals/response";
import "../internals/response"; // Required to initialize ServerResponse prototype

class SirusServer {
  private router: Router;
  private matcher: Matcher;
  private server: http.Server;

  constructor() {
    this.router = new Router();
    this.matcher = new Matcher(this.router);
    this.server = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        const route = this.matcher.match(req as SirusRequest);
        if (route !== undefined) {
          return route.handler(req as SirusRequest, res as SirusResponse);
        }

        return this.matcher.defaultNotFoundHandler(req, res);
      }
    );
  }

  /**
   * get
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public get(path: UserRouteType, handler: Function) {
    this.router.register(path, handler, RouteHTTPMethods.GET);
  }

  /**
   * post
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public post(path: UserRouteType, handler: Function) {
    this.router.register(path, handler, RouteHTTPMethods.POST);
  }

  /**
   * put
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public put(path: UserRouteType, handler: Function) {
    this.router.register(path, handler, RouteHTTPMethods.PUT);
  }

  /**
   * delete
   * @param path route to match on
   * @param handler function to handle matched route
   */
  public delete(path: UserRouteType, handler: Function) {
    this.router.register(path, handler, RouteHTTPMethods.DELETE);
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
}

export default SirusServer;
