"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconWrapper } from "@/components/ui/IconWrapper";

export interface NavbarProps {
  variant?: "logged-out" | "logged-in";
  userAvatarUrl?: string;
  onSearchSubmit?: (query: string) => void;
}

export function Navbar({
  variant = "logged-out",
  userAvatarUrl,
  onSearchSubmit,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all border-b border-[#E7E7E7]/60">
      {/* Desktop & Tablet Navigation */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[1440px] mx-auto px-6 lg:px-[70px] py-[7px] min-h-[65px]">
        {/* Left: Brand Logo & Navigation Link */}
        <div className="flex items-center gap-[29px] shrink-0">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
            aria-label="UIWithMotion Home"
          >
            <div className="relative w-[48.97px] h-[51px] shrink-0">
              <Image
                src="/icons/logo.svg"
                alt="UIWithMotion Logo"
                width={49}
                height={51}
                priority
                className="size-full object-contain"
              />
            </div>
          </Link>

          <Link
            href="/components"
            className="font-sans font-medium text-[16px] text-black hover:text-[#7D7F82] transition-colors leading-[1.2] whitespace-nowrap"
          >
            Components
          </Link>
        </div>

        {/* Center: Search Field */}
        <div className="w-full max-w-[397px] mx-6">
          <form onSubmit={handleSearchSubmit}>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ui components"
              className="w-full"
            />
          </form>
        </div>

        {/* Right: Pricing & CTA / Account */}
        <div className="flex items-center gap-[32px] shrink-0">
          <Link
            href="/pricing"
            className="font-sans font-medium text-[16px] text-black hover:text-[#7D7F82] transition-colors leading-[1.2] whitespace-nowrap"
          >
            Pricing
          </Link>

          {variant === "logged-out" ? (
            <Button
              variant="primary"
              size="md"
              href="/signup"
              className="!w-[98px] !px-[16px] !py-[12px] !text-[16px]"
            >
              Sign up
            </Button>
          ) : (
            <div className="relative size-[43px] rounded-full overflow-hidden border border-[#E7E7E7] shrink-0">
              {userAvatarUrl ? (
                <Image
                  src={userAvatarUrl}
                  alt="Account"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="size-full bg-[#EEF1F4] flex items-center justify-center font-sans font-medium text-[14px] text-[#1F2123]">
                  U
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-between h-[72px] px-5 w-full">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
          aria-label="UIWithMotion Home"
        >
          <div className="relative w-[48.97px] h-[51px] shrink-0">
            <Image
              src="/icons/logo.svg"
              alt="UIWithMotion Logo"
              width={49}
              height={51}
              priority
              className="size-full object-contain"
            />
          </div>
        </Link>

        {/* Mobile Navigation Actions */}
        <div className="flex items-center gap-[8px]">
          {/* Mobile Search Toggle */}
          <IconWrapper
            size="lg"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            aria-label="Toggle search"
          >
            <Image
              src="/icons/search-mobile.svg"
              alt="Search"
              width={24}
              height={24}
              className="size-[24px]"
            />
          </IconWrapper>

          {/* Mobile Hamburger Menu Toggle */}
          <IconWrapper
            size="md"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (mobileSearchOpen) setMobileSearchOpen(false);
            }}
            aria-label="Toggle navigation menu"
          >
            <Image
              src="/icons/menu.svg"
              alt="Menu"
              width={24}
              height={24}
              className="size-[24px]"
            />
          </IconWrapper>

          {/* Mobile Sign Up CTA */}
          {variant === "logged-out" ? (
            <Button
              variant="primary"
              size="md"
              href="/signup"
              className="!w-[98px] !px-[16px] !py-[12px] !text-[16px]"
            >
              Sign up
            </Button>
          ) : (
            <div className="relative size-[40px] rounded-full overflow-hidden border border-[#E7E7E7] shrink-0">
              {userAvatarUrl ? (
                <Image
                  src={userAvatarUrl}
                  alt="Account"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="size-full bg-[#EEF1F4] flex items-center justify-center font-sans font-medium text-[14px] text-[#1F2123]">
                  U
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-[#E7E7E7] px-5 py-3"
          >
            <form onSubmit={handleSearchSubmit}>
              <SearchInput
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ui components..."
                className="w-full"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-t border-[#E7E7E7] shadow-lg"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link
                href="/components"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-medium text-[18px] text-black hover:text-[#7D7F82] py-2 border-b border-[#F7F9FB]"
              >
                Components
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-medium text-[18px] text-black hover:text-[#7D7F82] py-2 border-b border-[#F7F9FB]"
              >
                Pricing
              </Link>
              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
