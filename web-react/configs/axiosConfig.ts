import axios from "axios";
import { AXIOS_BASE_URL } from "../constant";

const instance = axios.create({
  baseURL: AXIOS_BASE_URL,
});

export default instance;
