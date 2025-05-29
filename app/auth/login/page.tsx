"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { LoginCmd } from "@/app/api/apiService";
import { isLoggedIn, setToken } from "@/hooks/auth.ts";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await LoginCmd(email, password);
      setToken(res.token);
      console.log(res);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      if (isLoggedIn()) {
        window.location.href = "/dashboard/";
      } else {
        console.error("Login failed: Invalid credentials");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image with overlay */}
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 relative hidden md:block">
        <img
          src="https://www.tuv.com/content-media-files/master-content/services/products/tuv-rheinland-131699993_shutterstock_everything-possible.jpg"
          alt="Login Visual"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="relative z-10 flex items-center justify-center h-full text-white px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg">
              Log in to access your dashboard and manage your tasks.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8  rounded-xl">
          <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Sign in to your account
          </h1>

          <div className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className=" bg-white"
            />
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className=" bg-white"
            />

            <Button className="w-full rounded-md mt-4" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
