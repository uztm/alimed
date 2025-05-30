"use client";

import React, { useEffect, useState } from "react";

import { DataTableDemo } from "@/components/demo/dataTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { crud } from "@/app/api/apiService";
import { Patient, PatientsResponse } from "@/types/Patient";
import CreateDialog from "@/components/cmd/createDialog";

export default function Page() {
  const [data, setData] = useState<PatientsResponse>();
  const getDcoctors = async () => {
    try {
      const res = await crud.loadAll("Doctor");
      setData(res);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    getDcoctors();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const [createRole, setCreateRole] = useState<"patient" | "doctor">("patient");

  return (
    <div className="w-full min-h-[100vh] bg-background py-10">
      <div className="container mx-auto px-4">
        <div
          className="w-full h-[120px] border-1 border-primary bg-secondary rounded-md mb-5 flex items-center px-12 bg-cover bg-center"
          
        >
          <div className="flex items-center gap-4 justify-between w-full">
            <Link href={"/dashboard/admin"}>
              <Button
                className=" cursor-pointer"
                variant={"outline"}
                size={"icon"}
              >
                <ArrowLeft />
              </Button>
            </Link>
            <h1 className="font-bold text-2xl text-primary drop-shadow">
              Doctors
            </h1>

            <Button
              className="ml-auto"
              onClick={() => {
                setCreateRole("doctor");
                setOpenDialog(true);
              }}
            >
              Create Doctor
            </Button>
          </div>
        </div>
        {data && <DataTableDemo data={data?.items} />}

        <CreateDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          roleType={createRole}
        />
      </div>
    </div>
  );
}
