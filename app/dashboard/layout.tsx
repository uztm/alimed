"use client";

import Navbar from "@/components/common/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-[100px] flex">
      <Navbar />
      {children}
    </div>
  );
}
