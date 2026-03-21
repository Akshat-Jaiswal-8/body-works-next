'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { Card } from '@/components/exercise-card';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { cn } from '@/lib/utils';

type RefetchFn = () => void | Promise<unknown>;

type TaxonomyCardsQueryResult<TItem> = {
  items: TItem[] | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  refetch?: RefetchFn;
};

type TaxonomyCardsConfig<TItem> = {
  useData: () => TaxonomyCardsQueryResult<TItem>;
  getKey: (item: TItem) => string | number;
  getName: (item: TItem) => string;
  getImage: (item: TItem) => string;
  getSearchName?: (item: TItem) => string;
  path: string;
  wrapperClassName?: string;
  gridClassName?: string;
};

export function withTaxonomyCardsClient<TItem>({
  useData,
  getKey,
  getName,
  getImage,
  getSearchName,
  path,
  wrapperClassName,
  gridClassName,
}: TaxonomyCardsConfig<TItem>) {
  function TaxonomyCardsClient() {
    const { items, isLoading, isRefetching, error, refetch } = useData();

    useQueryErrorHandler(error, refetch);

    if (isLoading || isRefetching) {
      return <DataLoadingSkeleton />;
    }

    return (
      <div className={cn(wrapperClassName)}>
        <div className={cn('w-full', gridClassName)}>
          {items?.map((item) => {
            return (
              <Card
                key={getKey(item)}
                name={getName(item)}
                image={getImage(item)}
                searchName={getSearchName ? getSearchName(item) : undefined}
                path={path}
              />
            );
          })}
        </div>
      </div>
    );
  }

  TaxonomyCardsClient.displayName = 'TaxonomyCardsClient';

  return TaxonomyCardsClient;
}
