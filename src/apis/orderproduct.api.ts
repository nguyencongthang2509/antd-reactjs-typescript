import { Method, request } from "../helper/request.helper";
// import { IOrderProduct } from "../interface/OrderProduct.interface";

export class OrderProductAPI {
  static readonly COMPONENT_NAME: string = "OrderProducts";

  static fetchFromOrder = (orderId: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: { orderId },
          include: "product",
        },
      },
    });
  };
}
