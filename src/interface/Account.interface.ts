/** @format */

import { IBase } from "./Base.interface";
import { UserLevels } from "./constants/UserLevels.const";
import { IRole } from "./Role.interface";

export interface IAccount extends IBase {
  id?: number;
  activation?: boolean;
  username?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?:string;
  city?: number;
  district?: number;
  email?: string;
  password?: string;
  avatar?: string;
  typeRole?: UserLevels;
  roles?: IRole[];
}
