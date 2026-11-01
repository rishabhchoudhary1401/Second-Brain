import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000/api/v1" : "");

if (!baseURL) {
  throw new Error("VITE_API_URL is required in production");
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
