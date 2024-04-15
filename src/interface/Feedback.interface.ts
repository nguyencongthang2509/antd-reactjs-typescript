import { IAccount } from "./Account.interface";
import { IBase } from "./Base.interface";

export interface IFeedback extends IBase {
  id?: number;
  content?: string;
  accountId?: number;
  account?: IAccount;
}
