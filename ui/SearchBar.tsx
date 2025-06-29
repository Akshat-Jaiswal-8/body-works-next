import { Search } from "lucide-react";
import React, { useState } from "react";

function SearchBar(): React.ReactNode {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <>
      <div className={"mx-auto w-1/2 items-center justify-center"}>
        <form className="border-border-light-primary-color xs:text-[1rem] flex items-center justify-between rounded-lg border px-4 text-center md:text-lg dark:border-gray-700">
          <input
            placeholder="Search by name"
            className="font-poppins xs:text-xs xs:placeholder:text-xs overflow-x-scroll rounded-xl bg-transparent py-3 focus:outline-hidden md:w-3/4 md:text-base md:placeholder:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="xs:text-[1rem] cursor-pointer text-amber-900 md:text-xl dark:text-pink-500">
            <Search />
          </span>
        </form>
      </div>
    </>
  );
}
export default SearchBar;
