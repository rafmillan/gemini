import React from "react";
import Slider from "./ui/slider";

interface ModelParamsParams {
  // show: false,
  // maxOutputTokens: 1024,
  // temp: 0.5, // between 0 and 1
  // topK: 50, // idk
  // topP: 0.9, // between 0 and 1
  show: boolean;
  maxOutputTokens?: number;
  temp: number;
  topK: number;
  topP: number;
  handleTemp: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTopK: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTopP: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ModelParams(params: ModelParamsParams) {
  return (
    <React.Fragment>
      {params.show ? (
        <div className="justify-center items-center flex flex-col dt:w-full mt-2">
          <p className="text-gray-500 tracking-wide font-semibold dt:text-md text-xl">
            model parameters
          </p>
          <div className="flex flex-wrap dt:flex-row flex-col items-center justify-center align-middle">
            <Slider
              name="temperature"
              min={0}
              max={1}
              step={0.1}
              value={params.temp}
              onChange={params.handleTemp}
            />
            <Slider
              name="topK"
              min={0}
              max={100}
              step={5}
              value={params.topK}
              onChange={params.handleTopK}
            />
            <Slider
              name="topP"
              min={0}
              max={1}
              step={0.1}
              value={params.topP}
              onChange={params.handleTopP}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
