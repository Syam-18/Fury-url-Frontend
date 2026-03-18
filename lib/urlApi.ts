import { api } from "./api";

export const shortenUrl = async (originalUrl: string) =>
  (await api.post("/shorten", { originalUrl })).data;

export const getMyUrls = async () => (await api.get("/myurls")).data;

export const deleteUrl = async (id: string) =>
  (await api.delete(`/${id}`)).data;
