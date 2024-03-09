import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_HOST_API_KEY || "",
  baseURL: "/api",
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export type { AxiosResponse, AxiosError };
export default axiosInstance;
