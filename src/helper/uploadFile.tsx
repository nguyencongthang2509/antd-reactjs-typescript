import { ContainerAPI } from "../apis/container.api";
import { AppConfig } from "../AppConfig";

export default function uploadFile(file: File) {
  ContainerAPI.upload(file)
    .then((result) => {
      return `${AppConfig.apiUrl}/Containers/image/download/${result.data.result.files.file[0].name}`;
    })
    .catch((error) => {
      console.log(error);
    });
}
