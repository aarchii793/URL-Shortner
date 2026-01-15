

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // timeout: 10000,
  withCredentials: true, // Required for sending cookies
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Server Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Unexpected Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
