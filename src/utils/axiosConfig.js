import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  // baseURL: "http://localhost:4041/",
  baseURL: "https://appointmentmanagementsystem-3h3b.onrender.com",
});
