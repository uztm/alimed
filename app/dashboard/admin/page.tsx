"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User2, Stethoscope, ClipboardList } from "lucide-react";
import Link from "next/link";

const cmds = [
  {
    name: "Doctors",
    icon: <Stethoscope className="w-8 h-8" />,
    content: "Manage doctors, schedules, and profiles.",
  },
  // {
  //   name: "Nurses",
  //   icon: <ClipboardList className="w-8 h-8" />,
  //   content: "Assign nurses and track availability.",
  // },
  {
    name: "Users",
    icon: <User2 className="w-8 h-8" />,
    content: "View registered users and permissions.",
  },
];

export default function Page() {
  return (
    <div className="w-full min-h-[100vh] bg-background py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4">
          {cmds.map((cmd, i) => (
            <Link href={`/dashboard/admin/${cmd.name.toLowerCase()}`} key={i}>
              <div className="p-6 rounded-md border-1 border-primary bg-secondary text-center cursor-pointer ">
                <div className="font-semibold">{cmd.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
