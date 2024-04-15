import { Method, request } from "../helper/request.helper";
import { IAccount } from "../interface/Account.interface";

export class AccountAPI {
  static readonly COMPONENT_NAME: string = "Accounts";

  static login = ({ email, password }: { email: string; password: string }) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/login`,
      data: {
        email,
        password,
      },
    });
  };

  static getMe = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/get-me`,
      params: {
        filter: {
          include: "role",
        },
      },
    });
  };

  static logout = () => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/logout`,
    });
  };

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          include: "roles",
          order: "createdAt DESC",
        },
      },
    });
  };

  static update = (id: number, data: IAccount) => {
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

  static changeRole = (accountId: number, roleId: number) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/change-role`,
      params: {
        data: {
          accountId,
          roleId,
        },
      },
    });
  };
}
