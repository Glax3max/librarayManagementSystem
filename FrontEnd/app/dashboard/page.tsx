"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { groupBooks } from "@/utils/groupBooks";
import { protectRoute } from "@/utils/protect";

export default function Dashboard() {
  const [grouped, setGrouped] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    protectRoute("STUDENT");
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books/search");
      const groupedData = groupBooks(res.data);
      setGrouped(groupedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestBook = async (title: string, libraryId: string) => {
    try {
      await API.post("/books/request", { title, libraryId });
      alert("Book requested");
      fetchBooks();
    } catch (err: any) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      {grouped.length === 0 && (
        <p>No books available</p>
      )}

      {grouped.map((b, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold">{b.title}</h2>
          <p className="text-gray-600">{b.author}</p>

          <p className="mt-2">Total Copies: {b.total}</p>
          <p>Available: {b.available}</p>

          {b.available > 0 ? (
            <button
              onClick={() =>
                requestBook(b.title, b.libraryId)
              }
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Request Book
            </button>
          ) : (
            <p className="text-red-500 mt-2">
              All Booked 
            </p>
          )}
        </div>
      ))}
    </div>
  );
}