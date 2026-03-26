import axios from "axios";
import { api } from "./api";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    // 1) Call backend register
    const backendRes = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    const { token } = backendRes.data;

    if (!token) {
      throw new Error("No token returned from backend");
    }

    // 2) Set cookie via Next.js API
    const res = await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      throw new Error("Failed to set cookie");
    }

  } catch (err: unknown) {
    let message = "Something went wrong";

    if (axios.isAxiosError(err)) {
      message = err.response?.data || err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    console.error("Register flow error:", message);
    throw new Error(message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // 1) Call backend (furyurl.onrender.com) to authenticate and receive token
    const backendRes = await api.post("/auth/login", {
      email,
      password,
    });
    const { token } = backendRes.data;
    // console.log(token)
    if (!token) {
      throw new Error("No token returned from backend");
    }

    // 2) Call frontend API route to set HttpOnly cookie on frontend domain
    // Use same axios instance (baseURL should be your frontend) or relative path
    const res = await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token }),
    });


    if (!res.ok) {
      throw new Error("Failed to set cookie");
    }

  } catch (err: unknown) {
    let message = "Something went wrong";
  
    if (axios.isAxiosError(err)) {
      message = err.response?.data || err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }
  
    console.error("Login flow error:", message);
    throw new Error(message);
  }
}

export const getProfile = async () => (await api.get("/auth/profile")).data;
