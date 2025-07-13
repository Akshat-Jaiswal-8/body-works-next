import React from "react";

export const HeadingPrimary = ({ heading }: { heading: string }) => {
  return (
    <h1
      className={
        " xs:text-4xl sm:text-5xl font-poppins pb-3 italic bg-linear-to-br from-amber-800 to-amber-600 bg-clip-text font-bold text-transparent md:text-6xl lg:text67xl dark:from-slate-200 dark:to-slate-300"
      }
    >
      {heading}
    </h1>
  );
};
