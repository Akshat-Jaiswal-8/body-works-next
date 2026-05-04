'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { memo } from 'react';

export const PaginationProvider = memo(
  ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
    const searchParams = useSearchParams();
    const blockSize = 3;
    const currentBlock = Math.floor((currentPage - 1) / blockSize);
    const startPage = currentBlock * blockSize + 1;
    const endPage = Math.min(startPage + blockSize - 1, totalPages);
    const pages = [];

    const getHref = (page: number) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('page', String(page));

      return `?${params.toString()}`;
    };

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <Pagination className={'mt-10'}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={getHref(startPage - blockSize > 0 ? startPage - blockSize : 1)}
              aria-disabled={startPage === 1}
              className={startPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === currentPage} href={getHref(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={getHref(endPage + 1 <= totalPages ? endPage + 1 : totalPages)}
              aria-disabled={endPage === totalPages}
              className={
                endPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
);

PaginationProvider.displayName = 'PaginationProvider';
