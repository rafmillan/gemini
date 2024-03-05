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
    <div className="w-3/4 h-full flex flex-col justify-end items-center p-2">
      <h1 className="align-middle basis-1/5 text-2xl tracking-wide font-semibold">
        how can I help?
      </h1>
      <div className="basis-1/3 grid grid-cols-2 gap-2 w-full">
        {suggestions.length == 0 ? (
          <LoadingSuggestions />
        ) : (
          <React.Fragment>
            {suggestions.map((str: string, index: number) => (
              <button
                key={index}
                onClick={() => params.onClick(str)}
                value={str}
                className="border border-gray-300 rounded-lg bg-gray-200 text-left text-gray-800 px-5"
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
