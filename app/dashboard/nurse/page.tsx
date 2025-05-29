"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PatientsDoctor from "@/components/demo/patientsDoctor";
import { useUser } from "@/hooks/useUser";
import { LoadAllPatientsCmd, LoadAllDoctorsCmd } from "@/app/api/apiService";
import { PatientsResponse } from "@/types/Patient";
import { isLoggedIn } from "@/hooks/auth.ts";
import CreateDialog from "@/components/cmd/createDialog";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const { user } = useUser();

  const [patientsData, setPatientsData] = useState<PatientsResponse>();
  const [doctorsData, setDoctorsData] = useState<PatientsResponse>(); // Assuming same type

  const [openDialog, setOpenDialog] = useState(false);
  const [createRole, setCreateRole] = useState<"patient" | "doctor">("patient");

  const fetchData = async () => {
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        LoadAllPatientsCmd(),
        LoadAllDoctorsCmd(),
      ]);
      setPatientsData(patientsRes);
      setDoctorsData(doctorsRes);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Moderator Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patients Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Patients</h2>
              <Button
                onClick={() => {
                  setCreateRole("patient");
                  setOpenDialog(true);
                }}
              >
                Create Patient
              </Button>
            </div>
            <div className="space-y-4">
              {patientsData?.items?.map((item, index) => (
                <PatientsDoctor key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Doctors Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Doctors</h2>
              <Button
                onClick={() => {
                  setCreateRole("doctor");
                  setOpenDialog(true);
                }}
              >
                Create Doctor
              </Button>
            </div>
            <div className="space-y-4">
              {doctorsData?.items?.map((item, index) => (
                <PatientsDoctor key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        roleType={createRole}
      />
    </div>
  );
}
