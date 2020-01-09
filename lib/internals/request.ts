import { IncomingMessage } from "http";

export interface SirusRequest extends IncomingMessage {
  params?: any;
}
