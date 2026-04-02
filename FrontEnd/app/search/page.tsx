"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import API from "@/services/api";
import { groupBooks } from "@/utils/groupBooks";
import { protectRoute } from "@/utils/protect";

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q");

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 protect route
    protectRoute();

    if (query) fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await API.get(`/books/search?title=${query}`);
      const grouped = groupBooks(res.data);
      setResults(grouped);
    } catch (err: any) {
      if (err.response?.status === 401) {
        router.push("/login"); // 🔥 redirect if unauthorized
      }
    } finally {
      setLoading(false);
    }
  };
  const requestBook = async (title: string, libraryId: string) => {
  try {
    await API.post("/books/request", { title, libraryId });
    alert("Book requested");
    fetchResults(); 
  } catch (err: any) {
    alert(err.response?.data?.message || "Request failed");
  }
};

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">
        Results for "{query}"
      </h1>

      {results.length === 0 && <p>No results found</p>}

      {results.map((b, i) => (
  <div key={i} className="border p-4 mb-3 rounded shadow-sm">
    <h2 className="font-semibold text-lg">{b.title}</h2>
    <p>{b.author}</p>

    <p className="mt-2">Available: {b.available}</p>

    {b.available > 0 ? (
      <button
        onClick={() => requestBook(b.title, b.libraryId)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Request Book
      </button>
    ) : (
      <p className="text-red-500 mt-2 font-medium">
        All Booked ❌
      </p>
    )}
  </div>
))}
    </div>
  );
}