import { RouteHTTPMethods } from "./http-methods";
import Parser from "./parser";

export type UserRouteType = string;

export interface RegisteredRoute {
  handler: Function;
  paramNames: string[];
}

class Router {
  // Map<'HTTP Method', Map<'route key(regex)', 'handler'>>
  routes: Map<string, Map<string, RegisteredRoute>>;
  parser: Parser;

  constructor() {
    this.routes = new Map<string, Map<string, RegisteredRoute>>();
    this.parser = new Parser();
    Object.entries(RouteHTTPMethods).forEach(([, method]) => {
      this.routes.set(method, new Map<string, RegisteredRoute>());
    });
  }

  public register(
    path: UserRouteType,
    handler: Function,
    method: RouteHTTPMethods
  ) {
    const methodRoutes = this.routes.get(method);
    const parsedRoute = this.parser.parseRoute(path);
    methodRoutes.set(parsedRoute.routeKey, {
      handler: handler,
      paramNames: parsedRoute.paramNames
    });
    this.routes.set(method, methodRoutes);
  }
}

export default Router;
