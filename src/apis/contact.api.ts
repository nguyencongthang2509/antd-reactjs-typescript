import { Method, request } from "../helper/request.helper";

export class ContactAPI {
  static readonly COMPONENT_NAME: string = "Contacts";

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

  static delete = (id: number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };
}
