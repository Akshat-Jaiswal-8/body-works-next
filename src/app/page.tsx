import { Hero } from '@/features/home/components/hero';
import * as motion from 'motion/react-client';
import dynamic from 'next/dynamic';
const Features = dynamic(() =>
  import('@/features/home/components/features').then((mod) => mod.Features),
);
const UserTestimonials = dynamic(() =>
  import('@/features/home/components/testimonials').then((mod) => mod.UserTestimonials),
);
const Faq = dynamic(() => import('@/features/home/components/faq').then((mod) => mod.FAQ));

const Home = (): React.ReactNode => {
  return (
    <motion.div
      className='mb-[7rem] space-y-28 pb-0!'
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Features />
      <UserTestimonials />
      <Faq />
    </motion.div>
  );
};

export default Home;
