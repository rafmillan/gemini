"use client";
import { useEffect, useState } from "react";
import ModelParams from "./components/model_params";
import ModelOutput from "./components/model_output";
import ModelInput from "./components/model_input";

export default function Home() {
  // state for the prompt, response and output
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mParams, setMParams] = useState({
    show: false,
    maxOutputTokens: 1024,
    temp: 0.5, // between 0 and 1
    topK: 50, // idk
    topP: 0.9, // between 0 and 1
  });

  const toggleModelParams = async () => {
    const curr = mParams;
    setMParams({
      ...curr,
      show: !curr.show,
    });
  };

  const onSubmit = async () => {
    if (input === "" || input.length === 0) return;

    setResponse("");
    setLoading(true);

    // create a post request to the /api/chat endpoint
    const response = await fetch("api/generate", {
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
  }, [response]);

  const handleTempChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newT = parseFloat(event.target.value);
    const oldParams = mParams;
    setMParams({
      ...oldParams,
      temp: newT,
    });
  };

  const handleTopPChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTopP = parseFloat(event.target.value);
    const oldParams = mParams;
    setMParams({
      ...oldParams,
      topP: newTopP,
    });
  };

  const handleTopKChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTopK = parseFloat(event.target.value);
    const oldParams = mParams;
    setMParams({
      ...oldParams,
      topK: newTopK,
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col-reverse basis-1/3 flex-shrink-0">
        <ModelInput
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          toggleParams={toggleModelParams}
          rows={3}
        />
        <h1 className="text-5xl tracking-wide text-center">text generation</h1>
      </div>
      <div className="w-full flexitems-center justify-center">
        <ModelParams
          show={mParams.show}
          maxOutputTokens={mParams.maxOutputTokens}
          temp={mParams.temp}
          topK={mParams.topK}
          topP={mParams.topP}
          handleTemp={handleTempChange}
          handleTopK={handleTopKChange}
          handleTopP={handleTopPChange}
        />
      </div>
      <hr className="bg-gray-300 border-0 h-px mt-5 mx-40" />
      <ModelOutput loading={loading} response={response} output={output} />
    </div>
  );
}
