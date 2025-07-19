"use client";

import useDevice from "@/hooks/useDevice";
import { FooterNavbar } from "@/components/footer-navbar";
import React from "react";

export const Footer = React.memo((): React.ReactNode => {
  const { isMobile } = useDevice();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="h-[3rem]">
        {isMobile && (
          <div className={"fixed right-0 bottom-5"}>
            <FooterNavbar />
          </div>
        )}
        <div
          className={
            "xs:text-base py-3 w-full border-t border-t-amber-800 dark:border-t-gray-800 border-dotted bg-transparent backdrop-blur-sm md:text-base"
          }
        >
          <p className="text-center">Copyright © {currentYear} BodyWorks.</p>
        </div>
      </section>
    </>
  );
});

Footer.displayName = "Footer";
