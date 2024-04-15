import { Method, request } from "../helper/request.helper";
import { IOrder } from "../interface/Order.interface";

export class OrderAPI {
  static readonly COMPONENT_NAME: string = "Orders";

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          order: "createdAt DESC",
        },
      },
    });
  };

  static createMulti = (req: IOrder[]) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: req,
    });
  };

  static create = (data: IOrder) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: number, data: IOrder) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };

  static delete = (id: number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static statisticAmount = (year: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/statistic-amount`,
      params: {
        year,
      },
    });
  };

  static statisticRevenue = (year: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/statistic-revenue`,
      params: {
        year,
      },
    });
  };
}
