"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { getUser } from "@/utils/auth";
import { protectRoute } from "@/utils/protect";

export default function OwnerDashboard() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    author: "",
  });

  useEffect(() => {
    protectRoute("OWNER");
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books/owner-books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async () => {
  const user: any = getUser();

  if (!form.title || !form.author) {
    return alert("All fields required");
  }

  try {
    await API.post("/books", {
      ...form,
      libraryId: user.id 
    });

    alert("Book added");

    setForm({ title: "", author: "" });
    fetchBooks();

  } catch (err: any) {
    alert(err.response?.data?.message || "Error adding book");
  }
};

  const deleteBook = async (id: string) => {
    try {
      await API.delete(`/books/${id}`);
      alert("Deleted");
      fetchBooks();
    } catch {
      alert("Delete failed");
    }
  };

  const approve = async (id: string) => {
    try {
      await API.patch(`/books/approve/${id}`);
      alert("Approved ✅");
      fetchBooks();
    } catch {
      alert("Approval failed");
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">👑 Owner Dashboard</h1>

      {/* ADD BOOK FORM */}
      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Author"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <button
          onClick={addBook}
          className="bg-green-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* BOOK LIST */}
      {books.map((b) => (
        <div
          key={b._id}
          className="border p-4 mb-3 rounded shadow-sm"
        >
          <h2 className="font-semibold">{b.title}</h2>
          <p>{b.author}</p>
          <p>Status: {b.status}</p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => deleteBook(b._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            {b.status === "REQUESTED" && (
              <button
                onClick={() => approve(b._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}