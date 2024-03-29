import React from "react";

interface SliderParams {
  //  name="temperature",
  //  min={0},
  //  max={1},
  //  step={0.1},
  //  value={mParams.temp},
  //  onChange={handleTempChange},
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Slider(params: SliderParams) {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center text-center dt:my-0 my-2">
        <label
          className="text-gray-500 tracking-wide text-center dt:text-md text-lg"
          htmlFor="rangeSlider0"
        >
          {params.name}: {params.value}
        </label>
        <input
          className="ml-5 align-middle appearance-none dt:mt-0 mt-2 bg-gray-100
                  [&::-webkit-slider-thumb]:dt:w-3
                  [&::-webkit-slider-thumb]:dt:h-3
                  [&::-webkit-slider-thumb]:dt:-mt-1
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:-mt-1.5
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:bg-gray-700
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:duration-150
                  [&::-webkit-slider-thumb]:ease-in-out
                  [&::-webkit-slider-thumb]:dark:bg-gray-700
                  
                  dt:[&::-moz-range-thumb]:w-3
                  dt:[&::-moz-range-thumb]:h-3
                  [&::-moz-range-thumb]:w-3
                  [&::-moz-range-thumb]:h-3
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:bg-gray-700
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:border-gray-700
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:duration-150
                  [&::-moz-range-thumb]:ease-in-out
                  
                  [&::-webkit-slider-runnable-track]:w-full
                  [&::-webkit-slider-runnable-track]:h-1
                  [&::-webkit-slider-runnable-track]:bg-gray-500
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:dark:bg-gray-500
                  
                  [&::-moz-range-track]:w-full
                  [&::-moz-range-track]:h-1
                  [&::-moz-range-track]:bg-gray-500
                  [&::-moz-range-track]:rounded-full"
          type="range"
          id="rangeSlider0"
          name="temperature"
          min={params.min}
          max={params.max}
          step={params.step}
          value={params.value}
          onChange={params.onChange}
        />
      </div>
    </React.Fragment>
  );
}
