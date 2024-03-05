import { marked } from "marked";
import React from "react";
import LoadingText from "./ui/loading_text_skeleton";
import Marked from "./ui/marked";

interface ModelOutputParams {
  loading: boolean;
  response: string;
  output: string;
}

export default function ModelOutput(params: ModelOutputParams) {
  return (
    <React.Fragment>
      <div className="flex basis-2/3 justify-center overflow-scroll pb-5 pt-5">
        {params.response === "" && !params.loading ? (
          <></>
        ) : (
          <div className="h-fit align-center justify-center border border-gray-400 rounded-xl w-2/3 px-2 py-1 bg-gray-200 whitespace-normal">
            {params.loading ? (
              <LoadingText />
            ) : (
              Marked(marked.parse(params.output) as string)
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
