"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";
import API from "@/services/api";
import { saveToken } from "@/utils/auth";
import Input from "@/components/Input";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [role, setRole] = useState("STUDENT");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
  if (!form.name || !form.email || !form.password) {
    return setError("All fields are required");
  }

  try {
    setLoading(true);
    setError("");

    let res;

    // 🔥 Decide API based on role
    if (role === "OWNER") {
      res = await API.post("/libraries", {
        name: form.name,
        email: form.email,
        password: form.password,
        location: "Default Location" // you can make this dynamic later
      });
    } else {
      res = await API.post("/students/register", form);
    }

    // ✅ Save token
    saveToken(res.data.token);

    // 🔐 Decode user
    const user: any = getUser();

    // 🚀 Redirect based on role
    if (user?.role === "OWNER") {
      router.push("/owner");
    } else {
      router.push("/dashboard");
    }

  } catch (err: any) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-[350px]">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <div className="flex flex-col gap-3">

          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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

          <select
            className="border p-2 rounded"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="OWNER">Library Owner</option>
          </select>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </div>

        <p
          className="text-sm text-center mt-4 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}