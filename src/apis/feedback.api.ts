import { Method, request } from "../helper/request.helper";

export class FeedbackAPI {
  static readonly COMPONENT_NAME: string = "Feedbacks";

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          order: "createdAt DESC",
          include: "account"
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
