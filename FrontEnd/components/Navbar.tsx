"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // 🔥 important

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setMounted(true);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
  };

  // 🔥 prevent hydration mismatch
  if (!mounted) return null;

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow">

      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
         LibHub
      </h1>

      {/* SEARCH */}
      <div className="flex items-center gap-2 w-[40%]">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full p-2 border rounded-md"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-4 items-center">

        {user ? (
    <>
      {/* ✅ SHOW ONLY FOR STUDENT */}
      {user.role === "STUDENT" && (
        <button
          onClick={() => router.push("/my-books")}
          className="text-blue-600 font-medium"
        >
          My Books
        </button>
      )}

      <span className="text-sm text-gray-600">
        {user.role}
      </span>

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button onClick={() => router.push("/login")}>
        Login
      </button>

      <button
        onClick={() => router.push("/register")}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Register
      </button>
    </>
  )}

      </div>
    </nav>
  );
}