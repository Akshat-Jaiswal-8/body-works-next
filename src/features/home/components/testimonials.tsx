import { TestimonialCards } from '@/components/testimonial-card';
import { HeadingPrimary } from '@/features/home/components/heading-primary';
import * as motion from 'motion/react-client';
import React from 'react';

export const UserTestimonials = React.memo((): React.ReactNode => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 0, y: 200 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        ease: 'easeInOut',
      }}
      className={'md:h-[50vh]'}
    >
      <HeadingPrimary heading='See what our users say' />

      <TestimonialCards />
    </motion.section>
  );
});

UserTestimonials.displayName = 'UserTestimonials';
