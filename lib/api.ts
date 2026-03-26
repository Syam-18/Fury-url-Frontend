import axios from 'axios'

const apiUrl = 'https://furyurl.onrender.com'

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
})