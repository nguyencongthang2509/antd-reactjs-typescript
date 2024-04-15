import { Method, request } from "../helper/request.helper";
import { ICategoryProduct } from "../interface/CategoryProduct.interface";

export class CategoryProductAPI {
    static readonly COMPONENT_NAME: string = "CategoryProducts";

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

    static create = (data: ICategoryProduct) => {
        return request({
            method: Method.POST,
            url: `/${this.COMPONENT_NAME}`,
            data,
        });
    };

    static update = (id: number, data: ICategoryProduct) => {
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
