import { Method, request } from "../helper/request.helper";
import { IBlog } from "../interface/Blog.interface";

export class BlogAPI {
  static readonly COMPONENT_NAME: string = "Blogs";

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

  static create = (data: IBlog) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static put = (data: IBlog) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: number, data: IBlog) => {
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
}
