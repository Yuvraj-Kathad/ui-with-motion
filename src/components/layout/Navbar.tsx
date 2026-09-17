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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all border-b border-[#E7E7E7]/60">
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 h-screen w-screen bg-[#090A0B]/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop & Tablet Navigation */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[1440px] mx-auto px-6 lg:px-[70px] py-[7px] min-h-[65px]">
        {/* Left: Brand Logo & Navigation Link */}
        <div className="flex items-center gap-[29px] shrink-0">
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity"
            aria-label="UX With Motion Home"
          >
            <div className="relative w-[48.97px] h-[51px] shrink-0">
              <Image
                src="/icons/logo.svg"
                alt="UX With Motion Logo"
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
        <div 
          className={`w-full mx-6 transition-all duration-300 ease-in-out relative z-50 ${
            isSearchFocused ? "max-w-[700px]" : "max-w-[397px]"
          }`}
        >
          <form onSubmit={handleSearchSubmit}>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search ui components"
              className="w-full"
            />
          </form>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+12px)] left-0 w-full bg-white border border-[#E7E7E7] rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-4 z-50 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-6">
                  {/* Type of component section */}
                  <div>
                    <h4 className="font-sans font-medium text-[12px] text-[#7D7F82] mb-3 uppercase tracking-wider px-3">
                      Type of component
                    </h4>
                    <div className="flex flex-wrap gap-2 px-3">
                      {["Buttons", "Cards", "Inputs", "Navigation", "Layouts", "Typography"].map((type) => (
                        <button
                          key={type}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSearchQuery(type);
                            setIsSearchFocused(false);
                            if (onSearchSubmit) onSearchSubmit(type);
                          }}
                          className="px-4 py-2 bg-white hover:bg-[#F7F9FB] border border-[#DEE1E4] rounded-[100px] font-sans text-[14px] text-black transition-colors"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions section */}
                  <div>
                    <h4 className="font-sans font-medium text-[12px] text-[#7D7F82] mb-2 uppercase tracking-wider px-3">
                      Suggestions
                    </h4>
                    <div className="flex flex-col gap-1">
                      {["Buttons", "Cards & Layouts", "Form Inputs", "Navigation"].map((item) => (
                        <button
                          key={item}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSearchQuery(item);
                            setIsSearchFocused(false);
                            if (onSearchSubmit) onSearchSubmit(item);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F7F9FB] rounded-xl text-left transition-colors"
                        >
                          <Image
                            src="/icons/search-mobile.svg"
                            alt="Search"
                            width={16}
                            height={16}
                            className="opacity-50"
                          />
                          <span className="font-sans font-medium text-[14px] text-black">
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              href="/login"
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
          aria-label="UX With Motion Home"
        >
          <div className="relative w-[48.97px] h-[51px] shrink-0">
            <Image
              src="/icons/logo.svg"
              alt="UX With Motion Logo"
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
              href="/login"
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
                  href="/login"
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
