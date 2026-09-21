"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sendAdminPasswordReset } from "./actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await sendAdminPasswordReset(email);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to send reset email");
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white items-center justify-center p-8">
      <div className="w-full max-w-[400px]">
        <h1 className="font-title font-bold text-[32px] sm:text-[44px] leading-[1.2] text-black tracking-[-0.02em] mb-4">
          Reset Password
        </h1>
        <p className="text-[#888888] text-base mb-8">
          If this account is eligible for Admin access, you will receive a password-reset email.
        </p>

        {status === "success" ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-[12px] border border-green-200">
            Check your email for the password reset link.
          </div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base text-[#111111] font-medium">
                Email Id
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your admin email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="flex justify-center mt-4">
              <Link
                href="/admin/login"
                className="text-sm text-[#111111] font-medium hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
