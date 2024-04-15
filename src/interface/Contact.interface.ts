import { IBase } from "./Base.interface";

export interface IContact extends IBase {
  id?: number;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
