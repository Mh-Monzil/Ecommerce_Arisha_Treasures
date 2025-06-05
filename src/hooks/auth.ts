import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 }); // expires in 7 days
};

export const getToken = () => {
  return Cookies.get("token") || null;
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const getUserFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);

    return decoded;
  } catch (error) {
    console.error("Token decode error:", error);
    removeToken();
    return null;
  }
};
