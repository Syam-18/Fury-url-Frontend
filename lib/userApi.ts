import { api } from "./api";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => (await api.post("/auth/register", { username, email, password })).data;

export const loginUser = async (email: string, password: string) =>
  (await api.post("/auth/login", { email, password })).data;

export const getProfile = async () => (await api.get('/auth/profile')).data

