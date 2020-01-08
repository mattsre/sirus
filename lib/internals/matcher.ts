import { IncomingMessage, ServerResponse } from "http";
import Router from "./router";

class Matcher {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public match(req: IncomingMessage): Function {
    const methodRoutes = this.router.routes.get(req.method);
    return methodRoutes.get(req.url);
  }

  public notFoundHandler(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found");
  }
}

export default Matcher;
