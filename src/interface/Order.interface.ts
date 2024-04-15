import { IBase } from "./Base.interface";

export interface IOrder extends IBase {
  id?: number;
  code?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  email?: string;
  address?: string;
  city?: number;
  district?: number;
  note?: string;
  status?: string;
  price?: number;
  accountId?: number;
}