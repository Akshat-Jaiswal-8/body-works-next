import { FAQ } from '@/app/(home)/_components/faq';
import { Hero } from '@/app/(home)/_components/hero';
import * as motion from 'motion/react-client';
import dynamic from 'next/dynamic';
import React from 'react';
const Features = dynamic(() =>
  import('@/app/(home)/_components/features').then((mod) => mod.Features),
);
const UserTestimonials = dynamic(() =>
  import('@/app/(home)/_components/testimonials').then((mod) => mod.UserTestimonials),
);

const Home = (): React.ReactNode => {
  return (
    <motion.div
      className='container mb-[7rem] space-y-28 pb-0!'
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
