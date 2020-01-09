import { ServerResponse } from "http";

export interface SirusResponse extends ServerResponse {
  params?: any;
}
