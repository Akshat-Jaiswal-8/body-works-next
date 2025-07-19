import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEquipment } from "@/hooks/useEquipment";
import { cn } from "@/lib/utils";
import { PaginationProvidor } from "@/components/PaginationProvidor";
import { SectionWrapper } from "@/components/SectionWrapper";
import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { useErrorHandler } from "@/lib/error-utils";
import { DescriptedCard } from "@/components/DescriptedCard";

function Equipment() {
  const params = useParams();
  const equipment = params?.equipment as string;
  const [page, setPage] = useState(1);
  const { handleError } = useErrorHandler();

  const { Equipment, isLoading, error, refetch, isRefetching } = useEquipment(
    equipment,
    9,
    page
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <>
      <SectionWrapper>
        <div className={cn("w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3")}>
          {Object(Equipment)?.map((Equipment: IExercise) => {
            return (
              <DescriptedCard
                id={Equipment.id}
                key={Equipment.id}
                gif={Equipment.gifUrl}
                title={Equipment.title}
                blog={Equipment.blog}
              />
            );
          })}
        </div>
        <PaginationProvidor
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </SectionWrapper>
    </>
  );
}

export default Equipment;
