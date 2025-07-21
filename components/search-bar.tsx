"use client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useEffect,
  memo,
} from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";

export const SearchBar = memo(
  ({ getQuery }: { getQuery: (query: string) => void }): React.ReactNode => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
      if (getQuery) {
        getQuery(debouncedSearchQuery);
      }
    }, [debouncedSearchQuery]);

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      setSearchQuery(event.target.value);
    };

    return (
      <>
        <div className={"mx-auto items-center justify-center"}>
          <Input
            placeholder="Search by name"
            className="font-poppins h-10 xs:text-xs xs:placeholder:text-xs bg-transparent py-3 focus:outline-hidden max-w-lg mx-auto md:text-base md:placeholder:text-base"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
      </>
    );
  }
);

SearchBar.displayName = "SearchBar";
