import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://alphas-questionnaire-server.vercel.app",
  // baseURL: "http://localhost:3500",
  timeout: 15000 * 1000,
});

export default axiosInstance;
