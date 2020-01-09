import { IncomingMessage, ServerResponse } from "http";
import Router from "./router";
import Parser from "./parser";

class Matcher {
  private router: Router;
  private parser: Parser;

  constructor(router: Router) {
    this.router = router;
    this.parser = new Parser();
  }

  public match(req: IncomingMessage): Function {
    const methodRoutes = this.router.routes.get(req.method);
    for (const [key, val] of methodRoutes.entries()) {
      const result = req.url.match(key);
      if (result) {
        return val;
      }
    }
  }

  public defaultNotFoundHandler(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found");
  }
}

export default Matcher;
