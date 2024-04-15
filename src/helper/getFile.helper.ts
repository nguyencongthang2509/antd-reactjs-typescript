import { AppConfig } from "../AppConfig";
export const GetFile = (info: any) => {
  const photoURL = `${AppConfig.apiUrl}/Containers/image/download/${info.result.files.file[0].name}`;
  return photoURL;
};
