import axios, { AxiosInstance } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/";

interface ApiConfig {
  baseURL: string;
}

export const createApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  if (!baseURL) {
    throw new Error("API baseURL is required");
  }
  return axios.create({
    baseURL,
  });
};

export const apiCaller: AxiosInstance = createApi({ baseURL: API_BASE_URL });
