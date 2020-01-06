import SirusServer from "../../lib/server";
import { IncomingMessage, ServerResponse } from "http";

const hostname = "127.0.0.1";
const port = 3000;

const server = new SirusServer();

server.get("/hello", (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("Hello World!\n");
});

server.post("/hello", (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("Hello Post Request!\n");
});

server.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
