"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4"
      >
         Library Management Platform
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 mb-8 max-w-xl"
      >
        Discover libraries, explore books, and issue them seamlessly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded"
          onClick={() => router.push("/login")}
        >
          Get Started
        </button>

        <button
          className="border px-6 py-2 rounded"
          onClick={() => router.push("/owner")}
        >
          Owner Dashboard
        </button>
      </motion.div>
    </div>
  );
}