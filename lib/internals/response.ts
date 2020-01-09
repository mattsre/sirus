import { ServerResponse } from "http";

export interface SirusResponse extends ServerResponse {
  cache_key?: any;
}
