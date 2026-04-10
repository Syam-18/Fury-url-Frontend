import { api } from "./api";

export const shortenUrl = async (originalUrl: string) =>
  (await api.post("/shorten", { originalUrl })).data;

export const getMyUrls = async (pageNumber: number) =>
  (await api.get(`myurls/?page=${pageNumber}&limit=5`)).data;

export const deleteUrl = async (id: string) =>
  (await api.delete(`/${id}`)).data;
