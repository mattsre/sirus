import { IncomingMessage, ServerResponse } from "http";
import { RouteHTTPMethods } from "./http-methods";

class Router {
  // Map<'HTTP Method', Map<'path', 'handler'>>
  routes: Map<string, Map<string, Function>>;

  constructor() {
    this.routes = new Map<string, Map<string, Function>>();
    Object.entries(RouteHTTPMethods).forEach(([, method]) => {
      this.routes.set(method, new Map<string, Function>());
    });
  }

  public register(path: string, handler: Function, method: RouteHTTPMethods) {
    const methodRoutes = this.routes.get(method);
    methodRoutes.set(path, handler);
    this.routes.set(method, methodRoutes);
  }
}

export default Router;
