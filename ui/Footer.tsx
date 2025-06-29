import React from "react";
import { FooterNavbar } from "@/ui/FooterNavbar.tsx";
import { useMediaQuery } from "@uidotdev/usehooks";

export const Footer = (): React.ReactNode => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 767px)");
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section>
        {isSmallDevice && (
          <div className={"fixed right-0 bottom-5"}>
            <FooterNavbar />
          </div>
        )}
        {!isSmallDevice && <FooterNavbar />}
        <div
          className={
            "xs:text-xs xs:flex-col mt-10 flex items-center justify-center border-t border-t-slate-800 py-6 text-slate-700 sm:flex-row md:text-base dark:text-slate-300"
          }>
          Copyright © {currentYear} BodyWorks. Made with{" "}
          <span className={"px-2 text-2xl text-red-500"}> ♥</span> by Akshat.
        </div>
      </section>
    </>
  );
};
