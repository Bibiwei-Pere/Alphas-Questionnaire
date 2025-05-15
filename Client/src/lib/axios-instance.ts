import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://lassod-learning-server.vercel.app",
  baseURL: "http://localhost:3500",
  timeout: 15000 * 1000,
});

export default axiosInstance;
