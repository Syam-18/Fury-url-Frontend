"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/api";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");

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

    try {
      if (mode === "login") {
        console.log("Login data:", {
          email: form.email,
          password: form.password,
        });

        await loginUser(form.email, form.password);
      } else {
        console.log("Register data:", form);

        await registerUser(form.name, form.email, form.password);
      }
      console.log('abc')
      router.push("/");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] flex justify-center items-center px-6 relative">
      

      <div className="w-full max-w-md">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-[#22d3ee] via-[#a855f7] to-[#f472b6] bg-clip-text text-transparent">
            LinkShortener
          </h1>

          <p className="text-[#6b7280] mt-2">
            {mode === "login" ? "Login to your account" : "Create your account"}
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={submit}
          className="bg-[#11111a] border border-[#2a2a3a] rounded-md p-8 space-y-5"
        >
          {/* NAME (REGISTER ONLY) */}
          {mode === "register" && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full text-white bg-[#0b0b12] border border-[#2a2a3a] px-4 py-3 rounded-md outline-none focus:border-[#22d3ee]"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full text-white bg-[#0b0b12] border border-[#2a2a3a] px-4 py-3 rounded-md outline-none focus:border-[#22d3ee]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="w-full text-white bg-[#0b0b12] border border-[#2a2a3a] px-4 py-3 rounded-md outline-none focus:border-[#22d3ee]"
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-linear-to-r from-[#22d3ee] to-[#a855f7] hover:scale-[1.02] transition font-semibold cursor-pointer"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        {/* TOGGLE */}
        <div className="text-center mt-6 text-[#6b7280] text-sm">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-[#22d3ee] hover:text-[#f472b6] cursor-pointer"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#22d3ee] hover:text-[#f472b6] cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
