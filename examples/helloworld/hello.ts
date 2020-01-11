import SirusServer from "../../lib/server";
import { SirusRequest } from "../../lib/internals/request";
import { SirusResponse } from "../../lib/internals/response";

const hostname = "127.0.0.1";
const port = 3000;

const server = new SirusServer();

server.get("/hello", (req: SirusRequest, res: SirusResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("Hello World!\n");
});

server.get("/hello/:name", (req: SirusRequest, res: SirusResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(`Hello ${req.params.name} Route!\n`);
});

server.get(
  "/hello/:name/example/:id",
  (req: SirusRequest, res: SirusResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      name: req.params.name,
      id: req.params.id
    });
  }
);

server.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
