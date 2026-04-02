"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { protectRoute } from "@/utils/protect";

export default function MyBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    protectRoute("STUDENT");
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books/issued");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        📕 My Issued Books
      </h1>

      {books.length === 0 && (
        <p>No books issued yet</p>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {books.map((b) => (
          <div
            key={b._id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{b.title}</h2>
            <p className="text-gray-600">{b.author}</p>

            <p className="mt-2">
              📅 Issued On:{" "}
              {new Date(b.issueDate).toLocaleDateString()}
            </p>

            <p className="mt-2 text-red-500 font-bold">
              💰 Fine: ₹{b.currentFee}
            </p>

            {/* Optional status */}
            <p className="text-sm text-gray-500 mt-1">
              ₹5/day after issue
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}