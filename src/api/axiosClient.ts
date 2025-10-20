import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => response, // ⚠️ Trả về toàn bộ response, KHÔNG chỉ data
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
