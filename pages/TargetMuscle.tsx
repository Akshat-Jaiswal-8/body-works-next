import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useTargetMuscle } from "@/hooks/useTargetMuscle";
import { PaginationProvidor } from "@/components/PaginationProvidor";
import { SectionWrapper } from "@/components/SectionWrapper";
import { DescriptedCard } from "@/components/DescriptedCard";
import { useErrorHandler } from "@/lib/error-utils";
import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { cn } from "@/lib/utils";

function TargetMuscle() {
  const params = useParams();
  const targetMuscle = params?.targetMuscle as string;
  const [page, setPage] = useState(1);
  const { handleError } = useErrorHandler();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { TargetMuscle, isLoading, error, refetch, isRefetching } =
    useTargetMuscle(targetMuscle, 9, page);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    scrollToTop();
  };
  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    scrollToTop();
  };

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <SectionWrapper>
      <div
        ref={scrollContainerRef}
        className={cn("no-scrollbar container w-full overflow-y-scroll pb-4")}
      >
        <div className="mb-10 grid w-full lg:grid-cols-2 xl:grid-cols-3">
          {Object(TargetMuscle)?.map((targetMuscle: IExercise) => {
            return (
              <DescriptedCard
                id={targetMuscle.id}
                key={targetMuscle.id}
                gif={targetMuscle.gifUrl}
                title={targetMuscle.title}
                blog={targetMuscle.blog}
              />
            );
          })}
        </div>
      </div>
      <PaginationProvidor
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </SectionWrapper>
  );
}

export default TargetMuscle;
