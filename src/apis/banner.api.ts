import { Method, request } from "../helper/request.helper";
import { IBanner } from "../interface/Banner.interface";

export class BannerAPI {
    static readonly COMPONENT_NAME: string = "Banners";

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

    static create = (data: IBanner) => {
      console.log("data",data);
      
        return request({
            method: Method.POST,
            url: `/${this.COMPONENT_NAME}`,
            data,
        });
    };

    static update = (id: number, data: IBanner) => {
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
