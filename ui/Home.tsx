import React from "react";
import { Hero } from "@/pages/Hero";
import { Features } from "@/ui/Features";
import { motion } from "framer-motion";
import { UserTestimonials } from "@/ui/UserTestimonials";
import { Footer } from "@/ui/Footer";

export const Home = React.memo((): React.ReactNode => {
  return (
    <motion.div
      className={"container"}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Features />
      <UserTestimonials />
      <Footer />
    </motion.div>
  );
});
