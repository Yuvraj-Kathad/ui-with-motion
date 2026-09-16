import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface FooterLinkItem {
  label: string;
  href?: string;
}

const FEATURE_LINKS: FooterLinkItem[] = [
  { label: "Components", href: "/components" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact us", href: "/contact" },
];

const UPCOMING_ITEMS: FooterLinkItem[] = [
  { label: "Form Inputs" },
  { label: "Toggles & Checkboxes" },
  { label: "Navigation" },
  { label: "Cards & Layouts" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#FBFCFD] pt-12">
      {/* Desktop & Tablet Footer (Figma Node 1023:3313) */}
      <div className="hidden md:block w-full max-w-[1440px] mx-auto px-6 lg:px-[70px]">
        <div className="bg-[#F7F9FB] border border-[#DEE1E4] rounded-tl-[64px] rounded-tr-[64px] px-8 lg:px-[70px] py-[80px] shadow-sm">
          <div className="flex flex-col gap-[32px] w-full max-w-[1290px] mx-auto">
            {/* Top row: Brand + Features + Upcoming + Bubbles/Badge */}
            <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-10 lg:gap-[60px] xl:gap-[100px]">
              {/* Brand Artwork Composition */}
              <div className="relative w-[320px] lg:w-[500px] h-[260px] lg:h-[500px] shrink-0 overflow-hidden">
                <Image
                  src="/images/footer-branding.png"
                  alt="UIWithMotion"
                  fill
                  priority
                  className="object-contain object-left-top"
                />
              </div>

              {/* Features Column */}
              <div className="flex flex-col gap-[32px] shrink-0 min-w-[120px]">
                <h3 className="font-sans font-bold text-[20px] text-black leading-[1.2]">
                  Features
                </h3>
                <ul className="flex flex-col gap-[28px] list-none p-0 m-0 font-sans font-medium text-[16px] text-black">
                  {FEATURE_LINKS.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="hover:text-[#7D7F82] transition-colors leading-[1.2]"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="leading-[1.2]">{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's new coming Column */}
              <div className="flex flex-col gap-[32px] shrink-0 min-w-[180px]">
                <h3 className="font-sans font-bold text-[20px] text-black leading-[1.2]">
                  What’s new coming
                </h3>
                <ul className="flex flex-col gap-[28px] list-none p-0 m-0 font-sans font-medium text-[16px] text-black">
                  {UPCOMING_ITEMS.map((item) => (
                    <li key={item.label}>
                      <span className="leading-[1.2]">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>


            </div>

            {/* Bottom Row: Instagram & Copyright */}
            <div className="flex items-center justify-between pt-8 border-t border-[#DEE1E4]/60">
              <a
                href="https://instagram.com/uxwithmotion"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group text-[#1F2123] hover:text-[#4FBE6B] transition-colors"
                aria-label="Instagram @uxwithmotion"
              >
                <div className="relative size-[35px] shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    width={35}
                    height={35}
                    className="size-full object-contain"
                  />
                </div>
                <span className="font-sans font-semibold text-[14px]">
                  @uxwithmotion
                </span>
              </a>

              <div className="flex items-center gap-6 font-sans text-[13px] text-[#7D7F82]">
                <span>© {new Date().getFullYear()} UIWithMotion</span>
                <span>•</span>
                <Link href="/privacy" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-black transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer (Figma Node 1023:3451) */}
      <div className="block md:hidden w-full bg-[#F7F8F9] rounded-tl-[36px] rounded-tr-[36px] pt-[56px] overflow-hidden border-t border-[#DEE1E4]">
        <div className="px-6 flex flex-col gap-[40px]">
          {/* Brand Artwork */}
          <div className="relative w-[357px] h-[296px] shrink-0">
            <Image
              src="/images/footer-branding.png"
              alt="UIWithMotion"
              fill
              className="object-contain object-left-top"
            />
          </div>

          {/* Features Group */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="font-sans font-bold text-[16px] text-[#181A1B]">
              Features
            </h4>
            <div className="flex flex-col gap-[14px]">
              {FEATURE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href || "#"}
                  className="font-sans font-normal text-[14px] text-[#181A1B] hover:text-[#7D7F82] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* What's new coming Group */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="font-sans font-bold text-[16px] text-[#181A1B]">
              What’s new coming
            </h4>
            <div className="flex flex-col gap-[14px]">
              {UPCOMING_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="font-sans font-normal text-[14px] text-[#181A1B]"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>



          {/* Social Link */}
          <a
            href="https://instagram.com/uxwithmotion"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[10px] pb-4 group"
            aria-label="Instagram @uxwithmotion"
          >
            <div className="relative size-[34px] shrink-0">
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={34}
                height={34}
                className="size-full object-contain"
              />
            </div>
            <span className="font-sans font-semibold text-[14px] text-black group-hover:text-[#4FBE6B] transition-colors">
              @uxwithmotion
            </span>
          </a>
        </div>

        {/* Mobile Copyright Bar */}
        <div className="bg-white border-t border-[#D9DDE1] px-6 py-6 flex flex-col gap-2 font-inter font-normal text-[11px] text-[#74777C]">
          <p>© {new Date().getFullYear()} UIWithMotion</p>
          <p className="underline">Privacy Policy • Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
}
