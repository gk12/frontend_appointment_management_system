import { axiosInstance } from "../utils/axiosConfig";

export async function signin(credentials) {
  const { email, password, type } = credentials;
  const res = await axiosInstance.post("api/auth/authLogin", {
    email,
    password,
    type,
  });
  return res.data;
}

export async function signup(credentials) {
  const { name, email, phone, password, type } = credentials;
  const res = await axiosInstance.post("api/auth/authRegister", {
    name,
    email,
    phone,
    password,
    type,
  });
  return res.data;
}
