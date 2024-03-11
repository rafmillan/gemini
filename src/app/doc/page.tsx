"use client";
import { doc_placeholder } from "@/lib/const";
import React, { useEffect, useState } from "react";
import ModelInput from "../components/model_input";
import ModelParams from "../components/model_params";
import generateQuery, {
  dotProduct,
  euclideanDistance,
  findIndexOfLargestNumber,
  splitString,
} from "@/lib/utils";
import ChatHistory from "../components/chat_history";

export default function Doc() {
  const [inputQuery, setInputQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [queryHistory, setQueryHistory] = useState<{role: string, parts: string}[]>([]);
  const [loading, setLoading] = useState(false)
  const [doc, setDoc] = useState({
    text: doc_placeholder,
    rows: 26,
    loading: false,
    show: false,
    embed: [],
  });
  const [mParams, setMParams] = useState({
    show: false,
    maxOutputTokens: 1024,
    temp: 0.5, // between 0 and 1
    topK: 50, // idk
    topP: 0.9, // between 0 and 1
  });

  const onQuerySubmit = async () => {
    if (inputQuery === "" || inputQuery.length === 0 || doc.text.length === 0)
      return;

    // create prompt
    const prompt = generateQuery(inputQuery, doc.text)
    console.log(prompt)

    setQueryHistory([
      ...queryHistory,
      {role: "user", parts: inputQuery},
    ])
    setInputQuery("");
    setLoading(true)

    //create a post request to the /api/chat endpoint
    const response = await fetch("api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: prompt,
        ...mParams,
      }),
    });

    // get the response from the server
    const data = await response.json();
    console.log(data);
    setQueryResult(data.text)

  };

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

  const toggleModelParams = async () => {
    const curr = mParams;
    setMParams({
      ...curr,
      show: !curr.show,
    });
  };

  useEffect(() => {
    if (queryResult.length === 0 || queryResult === "") return 
    setQueryHistory([
      ...queryHistory,
      {role: "model", parts: queryResult}
    ])
    setLoading(false)

  }, [queryResult])

  return (
    <div className="h-full w-full flex flex-col dt:flex-row items-center justify-center">
      <div className="w-full dt:min-w-1/2 dt:max-w-1/2 dt:h-full dt:basis-1/2 h-1/3 min-h-1/3 max-h-1/3 basis-1/3 flex flex-col px-4 py-2">
        <p className="mb-2 px-1 tracking-wide">Paste your document below</p>
        <textarea
          className="w-full grow resize-none p-2 border border-gray-400 rounded-lg"
          placeholder={doc_placeholder}
          value={doc.text}
          onChange={(e) => {
            setDoc({ ...doc, text: e.target.value });
          }}
          rows={26}
        />
        {/* <hr className="bg-gray-400 h-px mt-5 mx-5"/> */}
      </div>
      <div className="w-full grow-0 h-full max-h-2/3 basis-2/3 dt:basis-1/2 max-w-1/2 flex px-4 py-2 overflow-clip">
        <div className="w-full flex flex-col-reverse">
          <ModelInput
            input={inputQuery}
            setInput={setInputQuery}
            onSubmit={onQuerySubmit}
            toggleParams={toggleModelParams}
            enabled={doc.text.length > 0}
            rows={2}
            width={"w-full"}
          />
          {mParams.show ? (
            <div className="mb-2">
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
          ) : (
            <></>
          )}
          <div className="grow overflow-x-clip flex items-start justify-center border border-gray-400 bg-white rounded-lg overflow-y-scroll">
            <ChatHistory history={queryHistory} loading={loading}/>
          </div>
          <p className="mb-2 tracking-wide">Query the document below</p>
        </div>
      </div>
    </div>
  );
}
