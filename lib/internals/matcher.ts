import Router, { RegisteredRoute } from "./router";
import { SirusRequest } from "./request";
import { SirusResponse } from "./response";

class Matcher {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public match(req: SirusRequest): RegisteredRoute {
    const methodRoutes = this.router.routes.get(req.method);
    for (const [key, val] of methodRoutes.entries()) {
      const result = req.url.match(key);
      if (result) {
        if (val.paramNames.length !== 0) {
          req.params = {};
          for (let i = 1; i < result.length; i++) {
            req.params[val.paramNames[i - 1]] = result[i];
          }
        }
        return val;
      }
    }

    return undefined;
  }

  public defaultNotFoundHandler(req: SirusRequest, res: SirusResponse) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 - Page Not Found");
  }
}

export default Matcher;
