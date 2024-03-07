import React from "react";
import { IconContext } from "react-icons";
import { LuSendHorizonal, LuSettings2 } from "react-icons/lu";

interface ModelInputParams {
  input: string;
  setInput: (val: string) => void;
  onSubmit: () => void;
  toggleParams: () => void;
  placeholder?: string;
  enabled?: boolean;
  rows?: number;
  width?: string;
}

export default function ModelInput(params: ModelInputParams) {
  const placeholder =
    params.placeholder === undefined ? "enter prompt..." : params.placeholder;
  const enabled = params.enabled === undefined ? true : params.enabled;
  const rows = params.rows === undefined ? 1 : params.rows;
  const width = params.width === undefined ? "w-2/3" : params.width;

  return (
    <React.Fragment>
      <div className={`w-full flex items-center justify-center mt-2`}>
        <textarea
          className={`align-middle ${width} border border-gray-400 rounded-lg px-2 py-1 mr-1 bg-gray-200 drop-shadow-md max-h-[136px] min-h-[34px]`}
          value={params.input}
          placeholder={placeholder}
          onChange={(e) => {
            params.setInput(e.target.value);
          }}
          rows={rows}
        />
        <button
          className={`bg-gray-600 text-gray-100 py-1 px-1 mr-1 rounded-lg border border-gray-700 ${
            !enabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => params.onSubmit()}
          disabled={!enabled}
        >
          <IconContext.Provider value={{ className: "text-gray-100" }}>
            <div>
              <LuSendHorizonal size={24} />
            </div>
          </IconContext.Provider>
        </button>
        <button
          className="bg-gray-600 py-1 px-1 rounded-lg border border-gray-700"
          onClick={() => params.toggleParams()}
        >
          <IconContext.Provider value={{ className: "text-gray-100" }}>
            <div>
              <LuSettings2 size={24} />
            </div>
          </IconContext.Provider>
        </button>
      </div>
    </React.Fragment>
  );
}
