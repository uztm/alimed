"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Stethoscope, Calendar, Phone, Mail, Lock } from "lucide-react";
import { crud, LoadAllDoctorsCmd } from "@/app/api/apiService";
import { PatientsResponse } from "@/types/Patient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  roleType: "patient" | "doctor";
};

export default function CreateUserDialog({ isOpen, onClose, roleType }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    doctorId: "",
  });

  const [doctors, setDoctors] = useState<PatientsResponse>();
  const isDoctor = roleType === "doctor";

  useEffect(() => {
    if (!isDoctor) {
      LoadAllDoctorsCmd()
        .then((res) => setDoctors(res))
        .catch((err) => console.error("Failed to load doctors:", err));
    }
  }, [isDoctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = isDoctor
      ? {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          role: 1,
        }
      : {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          dateOfBirth: form.dateOfBirth,
          password: form.password,
          role: 0,
          doctorId: Number(form.doctorId),
        };

    try {
      const resource = isDoctor ? "Doctor" : "Patient";
      const response = await crud.create({ resource, data: payload });
      console.log(`Created ${resource.toLowerCase()}:`, response);
      onClose();
    } catch (error) {
      console.error("Creation failed:", error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-white  p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {isDoctor ? (
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                ) : (
                  <UserPlus className="h-6 w-6 text-blue-600" />
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  Add New {isDoctor ? "Doctor" : "Patient"}
                </h2>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                />
                <UserPlus className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              {!isDoctor && (
                <>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone Number"
                    />
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>

                  <div className="relative">
                    <select
                      name="doctorId"
                      value={form.doctorId}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="" disabled>
                        Select a Doctor
                      </option>
                      {doctors?.items.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.fullName} ({doctor.email})
                        </option>
                      ))}
                    </select>
                    <Stethoscope className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </>
              )}

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Create
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}