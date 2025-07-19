import useTargetMuscles from "../hooks/useTargetMuscles";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Card } from "@/components/exercise-card";
import { useEffect } from "react";
import { useErrorHandler } from "@/lib/error-utils";
import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";

function TargetMuscles() {
  const { isLoading, targetMuscle, error, refetch, isRefetching } =
    useTargetMuscles();

  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) {
    return <DataLoadingSkeleton />;
  }

  return (
    <SectionWrapper>
      <div
        className={cn("no-scrollbar container w-full overflow-y-scroll pb-4")}
      >
        <div className={cn("w-full md:grid md:grid-cols-2 lg:grid-cols-3")}>
          {targetMuscle?.data.map((targetMuscle: ITargetMuscle) => {
            return (
              <Card
                name={targetMuscle.targetMuscle}
                image={targetMuscle.imageUrl}
                key={targetMuscle.targetMuscle}
                path={"target-muscle"}
              />
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default TargetMuscles;
