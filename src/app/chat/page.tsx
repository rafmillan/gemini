"use client";
import { useEffect, useState } from "react";
import ModelInput from "../components/model_input";
import ChatHistory from "../components/chat_history";
import ModelParams from "../components/model_params";

export default function Chat() {
  // state for chat
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ role: string; parts: string }[]>([]);
  const [cParams, setCParams] = useState({
    show: false,
    maxOutputTokens: 1024,
    temperature: 0.5, // between 0 and 1
    topK: 50, // idk
    topP: 0.9, // between 0 and 1
  });

  const toggleModelParams = async () => {
    const curr = cParams;
    setCParams({
      ...curr,
      show: !curr.show,
    });
  };

  const handleTempChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newT = parseFloat(event.target.value);
    const oldParams = cParams;
    setCParams({
      ...oldParams,
      temperature: newT,
    });
  };

  const handleTopPChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTopP = parseFloat(event.target.value);
    const oldParams = cParams;
    setCParams({
      ...oldParams,
      topP: newTopP,
    });
  };

  const handleTopKChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTopK = parseFloat(event.target.value);
    const oldParams = cParams;
    setCParams({
      ...oldParams,
      topK: newTopK,
    });
  };

  const onSubmit = async () => {
    if (input === "" || input.length === 0) return;
    console.log("submitted: %s", input);

    setHistory([...history, { role: "user", parts: input }]);

    setInput("");
    setResponse("");
    setLoading(true);

    const { show, ...modelParams } = cParams;

    // create a post request to the /api/chat endpoint
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: input,
        history: history,
        params: modelParams,
      }),
    });

    // get the response from the server
    const data: { text: string; history: { role: string; parts: [] }[] } =
    await response.json();
    const chatHistory = data.history;
    
    let newHistory: { role: string; parts: string } = {role: "", parts: ""};
    chatHistory.map((histo: any) => {
      const newRole = histo.role;
      const newPartsArr = histo.parts;
      let newParts = "";
      newPartsArr.map((part: any) => {
        newParts += part.text;
      });

      newHistory = { role: newRole, parts: newParts };

    });

    setHistory((prev) => [...prev, newHistory]);
    console.log(JSON.stringify(history));

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

    console.log("Response: %s", response);
  }, [response]);

  return (
    <div className="h-full w-full pb-5 pt-2 flex flex-col items-center align-bottom">
      <ChatHistory history={history} loading={loading} />
      <ModelParams
        show={cParams.show}
        maxOutputTokens={cParams.maxOutputTokens}
        temp={cParams.temperature}
        topK={cParams.topK}
        topP={cParams.topP}
        handleTemp={handleTempChange}
        handleTopK={handleTopKChange}
        handleTopP={handleTopPChange}
      />
      <ModelInput
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        toggleParams={toggleModelParams}
        placeholder="enter message..."
      />
    </div>
  );
}