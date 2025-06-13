"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface User {
  id: string;
  email: string;
  role: string;
}

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    Cookies.set("token", token, { expires: 7 }); // expires in 7 days
  }
};

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const getUserFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const decoded: User = jwtDecode(token);

    return decoded;
  } catch (error) {
    console.error("Token decode error:", error);
    removeToken();
    return null;
  }
};
