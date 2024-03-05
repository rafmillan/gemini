import React from "react";
import { IconContext } from "react-icons";
import { LuSendHorizonal, LuSettings2 } from "react-icons/lu";

interface ModelInputParams {
  input: string;
  setInput: (val: string) => void;
  onSubmit: () => void;
  toggleParams: () => void;
  placeholder?: string;
}

export default function ModelInput(params: ModelInputParams) {

  const placeholder = params.placeholder === undefined ? "enter prompt..." : params.placeholder

  return (
    <React.Fragment>
      <div className="w-full flex items-center justify-center mt-2">
        <textarea
          className="w-2/3 border border-gray-400 rounded-lg px-2 py-1 mr-1 bg-gray-200 drop-shadow-md max-h-[144px] min-h-[36px]"
          value={params.input}
          placeholder={placeholder}
          onChange={(e) => {
            params.setInput(e.target.value);
          }}
          rows={1}
        />
        <button
          className="bg-gray-600 text-gray-100 py-1 px-1 mr-1 rounded-lg border border-gray-700"
          onClick={() => params.onSubmit()}
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
