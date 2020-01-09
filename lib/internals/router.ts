import { RouteHTTPMethods } from "./http-methods";
import Parser from "./parser";

export type UserRouteType = string;

class Router {
  // Map<'HTTP Method', Map<'parsed route', 'handler'>>
  routes: Map<string, Map<string, Function>>;
  parser: Parser;

  constructor() {
    this.routes = new Map<string, Map<string, Function>>();
    this.parser = new Parser();
    Object.entries(RouteHTTPMethods).forEach(([, method]) => {
      this.routes.set(method, new Map<string, Function>());
    });
  }

  public register(
    path: UserRouteType,
    handler: Function,
    method: RouteHTTPMethods
  ) {
    const methodRoutes = this.routes.get(method);
    methodRoutes.set(this.parser.parseRoute(path), handler);
    this.routes.set(method, methodRoutes);
  }
}

export default Router;
