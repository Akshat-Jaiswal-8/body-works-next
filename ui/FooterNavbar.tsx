import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home } from "lucide-react";
import { exerciseNavItems, routineNavItems } from "./navbar";

export const FooterNavbar = (): React.ReactNode => {
  const footerNavItems = [
    ...exerciseNavItems,
    ...routineNavItems,
    { title: "Home", icon: <Home />, href: "/" },
  ];
  return (
    <div className="flex w-full items-center xs:justify-end md:h-48 md:justify-center">
      <FloatingDock items={footerNavItems} />
    </div>
  );
};
