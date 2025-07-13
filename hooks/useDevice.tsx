"use client";

import { useMediaQuery } from "@uidotdev/usehooks";

const useDevice = (queries?: string | string[]) => {
  const isMobile = useMediaQuery("only screen and (max-width : 767px)");
  const isTablet = useMediaQuery(
    "only screen and (min-width : 768px) and (max-width : 1024px)"
  );
  const isDesktop = useMediaQuery(
    "only screen and (min-width : 1025px) and (max-width : 2379px)"
  );
  const isDesktopLarge = useMediaQuery("only screen and (min-width : 2380px)");

  const singleQuery =
    typeof queries === "string" ? useMediaQuery(queries) : undefined;

  const multipleQueries = Array.isArray(queries)
    ? queries.map((query) => useMediaQuery(query))
    : undefined;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDesktopLarge,
    customQuery: singleQuery,
    customQueries: multipleQueries,
  };
};

export default useDevice;
