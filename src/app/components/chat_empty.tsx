import { ideas } from "@/lib/const";
import { selectRandomStrings } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import LoadingSuggestions from "./ui/loading_suggestions";
import React from "react";

interface ChatEmptyParams {
  ideas?: string[];
  onClick: (str: string) => void;
}

export default function ChatEmpty(params: ChatEmptyParams) {
  // autosuggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);
  useEffect(() => {
    setSuggestions(selectRandomStrings(ideas, 4));
  }, []);

  return (
    <div className="dt:w-3/4 h-full grow flex overflow-scroll flex-col justify-end items-center p-2 w-[90%]">
      <h1 className="align-middle basis-1/5 dt:text-5xl dt:font-normal tracking-wide text-3xl font-medium">
        How can I help?
      </h1>
      <div className="dt:basis-1/3 grid grid-cols-2 gap-2 w-full basis-1/2">
        {suggestions.length == 0 ? (
          <LoadingSuggestions />
        ) : (
          <React.Fragment>
            {suggestions.map((str: string, index: number) => (
              <button
                key={index}
                onClick={() => params.onClick(str)}
                value={str}
                className="text-md border border-gray-300 rounded-lg bg-gray-200 text-left text-gray-800 px-5 py-3"
              >
                {str}
              </button>
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
