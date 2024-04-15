import { IBase } from "./Base.interface";

export interface IAccessToken extends IBase {
  id: string;
  ttl: number;
  created: Date;
  userId: number;
}
