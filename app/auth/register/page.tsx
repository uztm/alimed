"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ correct import for app directory

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return <div className="w-full h-[100vh] bg-background">Loading...</div>;
}
