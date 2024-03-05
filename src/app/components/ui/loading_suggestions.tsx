import React from "react";
import LoadingText from "./loading_text_skeleton";

export default function LoadingSuggestions() {
  // why do we need w-202.5%???
  return (
      <div className="w-[202.5%] grid grid-cols-2 gap-2 h-full">
        <div className="border border-gray-300 rounded-lg bg-gray-200 text-left text-gray-800 px-5 py-3">
          <LoadingText color="bg-gray-400" numLines={2}/>
        </div>
        <div className="border border-gray-300 rounded-lg bg-gray-200 text-left text-gray-800 px-5 py-3">
          <LoadingText color="bg-gray-400" numLines={2}/>
        </div>
        <div className="border border-gray-300 rounded-lg bg-gray-200 text-left text-gray-800 px-5 py-3">
          <LoadingText color="bg-gray-400" numLines={2}/>
        </div>
        <div className="border border-gray-300 rounded-lg bg-gray-200 text-left text-gray-800 px-5 py-3">
          <LoadingText color="bg-gray-400" numLines={2}/>
        </div>
      </div>
  )
}