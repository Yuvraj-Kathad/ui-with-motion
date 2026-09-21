"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      // Successful login, redirect to admin dashboard.
      // The requireAdmin() server layout will enforce role checks.
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* Left Pane - Branding */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#F6F7F8]">
        <div className="relative w-[357px] h-[360px]">
          <Image
            src="/images/branding-logo.png"
            alt="UX With Motion"
            fill
            sizes="357px"
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <h1 className="font-title font-bold text-[32px] sm:text-[44px] leading-[1.2] text-black tracking-[-0.02em] mb-12">
            Welcome to Admin
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base text-[#111111] font-medium"
              >
                Email Id
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="Enter your admin email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[52px] px-5 rounded-[44px] border border-[#E9EAEB] bg-[#F6F7F8] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#1566E5] transition-colors [&:not(:placeholder-shown)]:bg-[#F1F4F6]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-base text-[#111111] font-medium"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[52px] px-5 rounded-[44px] border border-[#E9EAEB] bg-[#F6F7F8] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#1566E5] transition-colors [&:not(:placeholder-shown)]:bg-[#F1F4F6]"
              />
            </div>

            <div className="flex justify-end mt-[-12px]">
              <Link
                href="/admin/forgot-password"
                className="text-sm text-[#888888] hover:text-[#111111] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium mt-[-12px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] bg-[#1F2123] text-white rounded-[44px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
