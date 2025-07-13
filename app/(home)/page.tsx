import * as motion from "motion/react-client";
import React from "react";

import { FAQ } from "@/app/(home)/_components/faq";
import { Features } from "@/app/(home)/_components/features";
import { Hero } from "@/app/(home)/_components/hero";
import { UserTestimonials } from "@/app/(home)/_components/testimonials";

const Home = (): React.ReactNode => {
  return (
    <motion.div
      className="container space-y-28 pb-0!"
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Features />
      <UserTestimonials />
      <FAQ />
    </motion.div>
  );
};

export default Home;
