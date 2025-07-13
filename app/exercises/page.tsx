"use client";
import React from "react";
import { generateMetadata } from "@/lib/seo-utils";
import type { Metadata } from "next";

// Note: This should be moved to a server component when implementing properly
// For now, metadata is handled in the component itself
const ExercisesPage = React.memo((): React.ReactNode => {
  return (
    <div className="container mx-auto pt-[calc(var(--navbar-height)+4rem)]">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-pink-500 mb-8">
        Exercise Database
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Browse through 1300+ exercises with detailed instructions and
        animations.
      </p>
      {/* TODO: Import and use the actual Exercises component */}
    </div>
  );
});

export default ExercisesPage;

ExercisesPage.displayName = "ExercisesPage";
