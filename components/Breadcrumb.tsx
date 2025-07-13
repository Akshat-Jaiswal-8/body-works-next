"use client";
import React from "react";
import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showStructuredData?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showStructuredData = true,
}) => {
  const breadcrumbItems = [{ name: "Home", url: "/" }, ...items];

  return (
    <>
      {showStructuredData && (
        <BreadcrumbStructuredData items={breadcrumbItems} />
      )}

      <nav
        className="py-4 bg-amber-50 dark:bg-gray-800"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
                )}

                {index === 0 ? (
                  <Link
                    href={item.url}
                    className="flex items-center text-amber-700 dark:text-pink-400 hover:text-amber-900 dark:hover:text-pink-300 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 mr-1" />
                    {item.name}
                  </Link>
                ) : index === breadcrumbItems.length - 1 ? (
                  <span
                    className="text-gray-700 dark:text-gray-300 font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-amber-700 dark:text-pink-400 hover:text-amber-900 dark:hover:text-pink-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;
