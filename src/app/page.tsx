"use client";
import Marked from "./components/ui/marked";
import LoadingText from "./components/ui/loading_text_skeleton";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { IconContext } from "react-icons";
import { LuSendHorizonal, LuSettings2 } from "react-icons/lu";

export default function Home() {
  // state for the prompt, response and output
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mParams, SetMParams] = useState({
    show: false,
    maxOutputTokens: 1024,
    temp: 0.5, // between 0 and 1
    topK: 50, // idk
    topP: 0.9, // between 0 and 1
  });

  const toggleModelParams = async () => {
    const curr = mParams;
    SetMParams({
      ...curr,
      show: !curr.show,
    });
  };

  const onSubmit = async () => {
    if (input === "" || input.length === 0) return;
    console.log("submitted: %s", input);

    setResponse("");
    setLoading(true);

    // create a post request to the /api/chat endpoint
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPrompt: input,
        ...mParams,
      }),
    });

    // get the response from the server
    const data = await response.json();
    // set the response in the state
    setResponse(data.text);
    setLoading(false);
  };

  useEffect(() => {
    if (response === "" || response.length === 0) return;

    setOutput("");

    for (let i = 0; i < response.length; i++) {
      setTimeout(() => {
        setOutput((prev) => prev + response[i]);
      }, i * 10);
    }

    console.log("Response: %s", input, response);
  }, [response]);

  const handleTempChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newT = parseFloat(event.target.value);
    const oldParams = mParams;
    SetMParams({
      ...oldParams,
      temp: newT,
    });
  };

  const handleTopPChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTopP = parseFloat(event.target.value);
    const oldParams = mParams;
    SetMParams({
      ...oldParams,
      topP: newTopP,
    });
  };

  const handleTopKChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTopK = parseFloat(event.target.value);
    const oldParams = mParams;
    SetMParams({
      ...oldParams,
      topK: newTopK,
    });
  };

  return (
    <main className="w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-col-reverse basis-1/3 flex-shrink-0">
          <div className="flex items-center justify-center">
            <input
              className="border border-gray-400 rounded-lg px-2 py-1 mr-1 bg-gray-200"
              type="text"
              value={input}
              placeholder="enter prompt..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
              size={64}
            />
            <button
              className="bg-gray-600 text-gray-100 py-1 px-1 mr-1 rounded-lg border border-gray-700"
              onClick={() => onSubmit()}
            >
              <IconContext.Provider value={{ className: "text-gray-100" }}>
                <div>
                  <LuSendHorizonal size={24} />
                </div>
              </IconContext.Provider>
            </button>
            <button
              className="bg-gray-600 py-1 px-1 rounded-lg border border-gray-700"
              onClick={() => toggleModelParams()}
            >
              <IconContext.Provider value={{ className: "text-gray-100" }}>
                <div>
                  <LuSettings2 size={24} />
                </div>
              </IconContext.Provider>
            </button>
          </div>
          <h1 className="text-5xl mb-2 tracking-wide text-center">chat</h1>
        </div>
        {mParams.show ? (
          <div className="justify-center items-center flex flex-col w-full mt-2">
            <p className="text-gray-500 tracking-wide font-semibold">
              model parameters
            </p>
            <div className="flex">
              <div className="flex flex-col items-center justify-center text-center">
                <label
                  className="text-gray-500 tracking-wide text-center"
                  htmlFor="rangeSlider0"
                >
                  temperature: {mParams.temp}
                </label>
                <input
                  className="ml-5 align-middle"
                  type="range"
                  id="rangeSlider0"
                  name="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={mParams.temp}
                  onChange={handleTempChange}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <label
                  className="text-gray-500 tracking-wide text-center"
                  htmlFor="rangeSlider1"
                >
                  topK: {mParams.topK}
                </label>
                <input
                  className="ml-5 align-middle"
                  type="range"
                  id="rangeSlider1"
                  name="topK"
                  min={0}
                  max={100}
                  step={5}
                  value={mParams.topK}
                  onChange={handleTopKChange}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <label
                  className="text-gray-500 tracking-wide text-center"
                  htmlFor="rangeSlider2"
                >
                  topP: {mParams.topP}
                </label>
                <input
                  className="ml-5 align-middle"
                  type="range"
                  id="rangeSlider2"
                  name="topP"
                  min={0}
                  max={1}
                  step={0.1}
                  value={mParams.topP}
                  onChange={handleTopPChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <hr className="bg-gray-300 border-0 h-px mt-5 mx-40" />
        <div className="flex basis-2/3 justify-center overflow-scroll pb-5 pt-5">
          {response === "" && !loading ? (
            <></>
          ) : (
            <div className="h-fit align-center justify-center border border-gray-400 rounded-xl w-2/3 px-2 py-1 bg-gray-200 whitespace-normal">
              {loading ? (
                <LoadingText />
              ) : (
                Marked(marked.parse(output) as string)
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
