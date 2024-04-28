import axios from "axios";
import { DEFAULTURL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: DEFAULTURL,
  withCredentials: true,
});
