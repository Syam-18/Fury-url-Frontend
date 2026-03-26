"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/userApi";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setStatus("Please enter email and password");
      return;
    }

    try {
      setStatus("Checking credentials ...");

      if (mode === "login") {
        await loginUser(form.email, form.password);
      } else {
        if (!form.name.trim()) {
          setStatus("Please enter your name");
          return;
        }
        await registerUser(form.name, form.email, form.password);
      }

      setStatus("Success! Redirecting...");
      router.push("/");
    } catch (err) {
      console.log(err)
      setStatus(`Invalid credentials`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] flex justify-center items-center px-6 relative">
      <div className="w-full max-w-md">
        {/* TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-[#22d3ee] via-[#a855f7] to-[#f472b6] bg-clip-text text-transparent">
            furyurl
          </h1>

          <p className="text-[#6b7280] mt-2">
            {mode === "login" ? "Login to your account" : "Create your account"}
          </p>
        </div>

        {/* NEW TOGGLE HEADER */}
        <div className="flex flex-row-reverse bg-[#11111a] border border-[#2a2a3a] rounded-md p-1 mb-4">
          <button
            onClick={() => setMode("register")}
            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition ${
              mode === "register"
                ? "bg-linear-to-r from-[#22d3ee] to-[#a855f7] text-white"
                : "text-[#6b7280]"
            }`}
          >
            Sign Up
          </button>

          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition ${
              mode === "login"
                ? "bg-linear-to-r from-[#22d3ee] to-[#a855f7] text-white"
                : "text-[#6b7280]"
            }`}
          >
            Login
          </button>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={submit}
          className="bg-[#11111a] border border-[#2a2a3a] rounded-md p-8 space-y-5"
        >
          {mode === "register" && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full text-white bg-[#0b0b12] border border-[#2a2a3a] px-4 py-3 rounded-md outline-none focus:border-[#22d3ee]"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full text-white bg-[#0b0b12] border border-[#2a2a3a] px-4 py-3 rounded-md outline-none focus:border-[#22d3ee]"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="w-full text-white bg-[#0b0b12] border border-[#2a2a3a] px-4 py-3 rounded-md outline-none focus:border-[#22d3ee]"
          />

          {status && <p className="font-semibold text-sm text-[#22d3ee]">{status}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-linear-to-r from-[#22d3ee] to-[#a855f7] hover:scale-[1.02] transition font-semibold cursor-pointer"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
