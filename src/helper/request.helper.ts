/** @format */

import axios from "axios";
import { AppConfig } from "../AppConfig";
import { getToken } from "./userToken";

export enum Method {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (config.headers && token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);