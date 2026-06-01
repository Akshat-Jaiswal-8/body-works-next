import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Image from 'next/image';
import { memo } from 'react';

interface IRoutineCardProps {
  routine_title: string;
  routine_description: string;
  routine_imageUrl: string;
}

export const RoutineCard = memo(
  ({ routine_title, routine_description, routine_imageUrl }: IRoutineCardProps) => {
    return (
      <CardContainer className='font-poppins xs:max-w-[16rem] no-scrollbar min-h-fit sm:max-w-80 lg:max-w-70'>
        <CardBody className='group/card scrollbar-hide relative mt-10 flex h-auto flex-col items-center justify-center space-y-6 overflow-hidden rounded-xl border border-black/20 bg-gray-50 p-6 shadow-lg shadow-amber-900 transition-all duration-300 hover:-translate-y-6 dark:border-gray-800 dark:bg-black dark:shadow-pink-500 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10'>
          <CardItem
            translateZ='50'
            className='line-clamp-2 text-xl font-bold text-gray-800 dark:text-white'
          >
            {routine_title}
          </CardItem>

          <CardItem translateZ='100' rotateX={20} rotateZ={-10} className='mt-4 w-full'>
            <Image
              src={routine_imageUrl}
              height='1000'
              width='1000'
              quality={100}
              className='h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl'
              alt='thumbnail'
            />
          </CardItem>
          <CardItem
            as='p'
            translateZ='60'
            className='mt-2 line-clamp-4 max-w-sm text-sm text-neutral-500 dark:text-neutral-300'
          >
            {routine_description}
          </CardItem>
        </CardBody>
      </CardContainer>
    );
  },
);

RoutineCard.displayName = 'RoutineCard';
