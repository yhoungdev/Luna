import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://solana-rugchecker.onrender.com/api/",
  withCredentials: true,
});
