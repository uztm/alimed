"use client";

import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  User,
  Mail,
  Calendar,
  Phone,
  ClipboardList,
  Copy,
  Check,
} from "lucide-react";

// --- ProfileDetail Component (New) ---
interface ProfileDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}

function ProfileDetail({ icon, label, value }: ProfileDetailProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
      <div className="flex-shrink-0 text-primary-500 dark:text-primary-400">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-base font-medium text-gray-900 dark:text-gray-100 break-words">
          {value}
        </p>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Page() {
  const { user, loading } = useUser();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailCopy = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000); // Reset icon after 2 seconds
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex justify-center items-center p-4">
        <Skeleton className="w-full max-w-lg h-96 rounded-xl shadow-lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p className="text-muted-foreground text-xl">No user found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-gray-50 dark:from-background dark:to-gray-900 flex justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-850  shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header Section */}
        <div className="bg-primary-600 dark:bg-primary-700  p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          <User className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full bg-white/20 p-3" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {user.fullName || "Patient Profile"}
          </h1>
          <p className="text-black text-lg mt-1">Your comprehensive personal overview</p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <ProfileDetail
            icon={<User className="w-5 h-5" />}
            label="Full Name"
            value={user.fullName}
          />

          <ProfileDetail
            icon={<Mail className="w-5 h-5" />}
            label="Email Address"
            value={
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-2 cursor-pointer group">
                      {user.email}
                      <button
                        onClick={handleEmailCopy}
                        className="text-gray-400 hover:text-primary-500 transition-colors p-1 -m-1 rounded-md"
                        aria-label="Copy email address"
                      >
                        {emailCopied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {emailCopied ? "Copied!" : "Click to copy"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            }
          />

          <ProfileDetail
            icon={<ClipboardList className="w-5 h-5" />}
            label="Role"
            value={<span className="capitalize">{user.role}</span>}
          />

          <ProfileDetail
            icon={<Phone className="w-5 h-5" />}
            label="Phone Number"
            value={user.phoneNumber || "N/A"}
          />

          <ProfileDetail
            icon={<Calendar className="w-5 h-5" />}
            label="Date of Birth"
            value={user.dateOfBirth || "N/A"}
          />

          <ProfileDetail
            icon={<ClipboardList className="w-5 h-5" />}
            label="Assigned Doctor ID"
            value={user.doctor || "N/A"}
          />
        </div>
      </div>
    </div>
  );
}
