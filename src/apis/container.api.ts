import { Method, request } from "../helper/request.helper";

export class ContainerAPI {
    static readonly COMPONENT_NAME: string = "Containers";

    static upload = (file: File) => {
        const data = new FormData();
        data.append("file", file);
        return request({
            method: Method.POST,
            url: `/${this.COMPONENT_NAME}/image/upload`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data,
        });
    };
}
