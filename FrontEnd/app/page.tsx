"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";
import Hero from "@/components/Hero";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user: any = getUser();

    if (user?.role === "OWNER") {
      router.push("/owner");
    } else if (user?.role === "STUDENT") {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
    </div>
  );
}