import { ServerResponse } from "http";

declare module "http" {
  interface ServerResponse {
    json: (data: Record<string, any>, statusCode?: number) => void;
  }
}

ServerResponse.prototype.json = function(
  data: Record<string, any>,
  statusCode?: number
) {
  this.statusCode = statusCode | 200;
  this.setHeader("Content-Type", "application/json");
  this.end(JSON.stringify(data));
};

export class SirusResponse extends ServerResponse {
  cache_key?: any;
}
