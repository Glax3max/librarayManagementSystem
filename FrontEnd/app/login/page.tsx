"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";
import API from "@/services/api";
import { saveToken } from "@/utils/auth";
import Input from "@/components/Input";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return setError("All fields required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/students/login", form);

      saveToken(res.data.token);

      // role-based redirect (later improve)

        const user: any = getUser();

        if (user.role === "OWNER") {
        router.push("/owner");
        } else {
        router.push("/dashboard");
        }


    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <div className="flex flex-col gap-3">

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p
          className="text-sm text-center mt-4 cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Don’t have an account? Register
        </p>

      </div>
    </div>
  );
}