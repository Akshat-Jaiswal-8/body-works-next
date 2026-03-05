import Link from 'next/link';

const NotFound = () => {
  return (
    <section className='container flex h-[calc(100vh-var(--navbar-height)-3.1rem)] flex-col justify-between overflow-x-hidden'>
      <div className='flex grow items-center justify-center px-4'>
        <div className='max-w-md text-center'>
          <h2 className='mb-4 text-[48px] font-extrabold text-amber-700 sm:text-[64px] md:text-[80px] lg:text-[96px] dark:text-white'>
            404
          </h2>

          <h4 className='mb-4 text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl dark:text-gray-300'>
            Oops! That page can&apos;t be found.
          </h4>
          <p className='mb-8 text-sm text-gray-700 sm:text-base lg:text-lg dark:text-gray-400'>
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>

          <Link
            href='/'
            className='rounded-lg border px-8 py-3 text-center text-base transition hover:shadow hover:shadow-amber-700 dark:hover:shadow-pink-500'
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
