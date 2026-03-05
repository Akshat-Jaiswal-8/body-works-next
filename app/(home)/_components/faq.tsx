import { memo } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HeadingPrimary } from './heading-primary';

import { faqs } from '../constants';

export const FAQ = memo(() => {
  return (
    <section className='mx-auto'>
      <div className='grid grid-cols-1 gap-4 space-y-6 md:grid-cols-3'>
        <HeadingPrimary heading='FAQs' />
        <Accordion type='single' className='col-span-2 w-full' collapsible>
          {faqs.map((faq) => (
            <AccordionItem value={faq.question} key={faq.question} className='font-urbanist pb-2'>
              <AccordionTrigger className='py-2 text-lg leading-6 hover:no-underline'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-muted-foreground pb-2'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';
