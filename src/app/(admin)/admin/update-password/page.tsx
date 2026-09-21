"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Ensure user is authenticated to see this page
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login?error=not_authenticated");
      }
    };
    checkSession();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords do not match");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;
      setStatus("success");
      
      // Redirect to admin dashboard after successful update
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to update password");
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white items-center justify-center p-8">
      <div className="w-full max-w-[400px]">
        <h1 className="font-title font-bold text-[32px] sm:text-[44px] leading-[1.2] text-black tracking-[-0.02em] mb-4">
          Update Password
        </h1>
        <p className="text-[#888888] text-base mb-8">
          Enter your new admin password.
        </p>

        {status === "success" ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-[12px] border border-green-200">
            Password updated successfully! Redirecting to admin panel...
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-base text-[#111111] font-medium">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-[52px] px-5 rounded-[44px] border border-[#E9EAEB] bg-[#F6F7F8] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#1566E5]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-base text-[#111111] font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-[52px] px-5 rounded-[44px] border border-[#E9EAEB] bg-[#F6F7F8] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#1566E5]"
              />
            </div>

            {status === "error" && (
              <div className="text-red-500 text-sm font-medium mt-[-12px]">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-[52px] bg-[#1F2123] text-white rounded-[44px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
            >
              {status === "loading" ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
