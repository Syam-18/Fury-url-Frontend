import axios from 'axios'

export const api = axios.create({
  baseURL: "https://furyurl.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
})