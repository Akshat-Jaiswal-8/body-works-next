import React from "react";
import SearchBar from "@/ui/SearchBar";
import { Footer } from "@/ui/Footer";

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "relative mt-[calc(var(--navbar-height)+2rem)] h-full w-full overflow-x-hidden"
      }
    >
      <main className={"my-10 min-h-[50vh]"}>
        <SearchBar />
        {children}
      </main>
      <Footer />
    </div>
  );
};
