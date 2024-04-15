/** @format */

import { eraseCookie, getCookie, setCookie } from "./cookie";

export const getToken = (): string => {
  return localStorage.getItem("userToken") || getCookie("userToken") || "";
};

export const setToken = (token: string, remember: boolean): void => {
  remember ? localStorage.setItem("userToken", token) : setCookie("userToken", token, 1);
};

export const deleteToken = (): void => {
  localStorage.removeItem("userToken");
  eraseCookie("userToken");
};
