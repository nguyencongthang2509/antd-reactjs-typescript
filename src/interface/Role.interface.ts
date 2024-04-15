import { IBase } from "./Base.interface";
import { UserLevels } from "./constants/UserLevels.const";

export interface IRole extends IBase {
  id?: number;
  name?: UserLevels;
  description?: string;
}
