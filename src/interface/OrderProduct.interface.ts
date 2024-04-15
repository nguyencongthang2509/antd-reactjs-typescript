import { IBase } from "./Base.interface";
import { IOrder } from "./Order.interface";
import { IProduct } from "./Product.interface";

export interface IOrderProduct extends IBase {
  amount?: number;
  price?: number;
  id?: number;
  productId?: number;
  orderId?: number;
  product:IProduct;
  order?:IOrder;
}