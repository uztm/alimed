"use client";
import { Bell, LogOut, SquareActivity } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NotificationsDialog from "./notifications";
import { logOut } from "@/hooks/auth.ts";
import { crud } from "@/app/api/apiService";
import { EmergencyRecord } from "@/types/Role";

export default function Navbar() {
  const [notifications, setNotifications] = useState<EmergencyRecord[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await crud.loadAll("Notifications");
      setNotifications(res);
    } catch (e) {
      console.log(e);
    }
  };
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleConfirmLogout = () => {
    setLogoutDialogOpen(false);
    logOut();
  };

  return (
    <div className="w-[100px] fixed left-0 h-[100vh] bg-card shadow border flex pt-10 justify-between">
      <div className="mx-auto px-4 container flex flex-col gap-10 items-center h-[90vh] justify-between">
        <NotificationsDialog
          notifications={notifications}
          onOpenChange={(open) => {
            if (open) fetchNotifications();
          }}
        />

        {/* Logout Confirmation Dialog */}
        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="cursor-pointer"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmLogout}>
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
