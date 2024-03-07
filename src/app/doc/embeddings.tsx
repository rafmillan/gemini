"use client";
import { doc_placeholder } from "@/lib/const";
import React, { useEffect, useState } from "react";
import ModelInput from "../components/model_input";
import ModelParams from "../components/model_params";
import { dotProduct, euclideanDistance, findIndexOfLargestNumber, splitString } from "@/lib/utils";

export default function Doc() {
  const [inputQuery, setInputQuery] = useState("");
  const [inputEmbed, setInputEmbed] = useState([]);
  const [queryHistory, setQueryHistory] = useState({});
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

  const onDocSubmit = async () => {
    if (doc.text === "" || doc.text.length === 0) return;

    setDoc({ ...doc, loading: true });

    const docSplit = splitString(doc.text, 32)
    console.log(docSplit)

    // create a post request to the /api/chat endpoint
    const response = await fetch("api/doc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docs: docSplit,
        type: "retrieval_document",
      }),
    });

    // get the response from the server
    const data = await response.json();
    console.log(data.embedding);

    // set the response in the state
    setDoc({ ...doc, loading: false, embed: data.embedding });
  };

  const onQuerySubmit = async () => {
    if (inputQuery === "" || inputQuery.length === 0 || doc.embed.length === 0)
      return;

    console.log("submitted: ", inputQuery);

    // create a post request to the /api/chat endpoint
    const response = await fetch("api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: inputQuery,
        type: "retrieval_query",
      }),
    });

    setInputQuery("")

    // get the response from the server
    const data = await response.json();
    console.log(data.embedding.values);
    setInputEmbed(data.embedding.values);
  };

  function showEmbeddings() {
    setDoc({ ...doc, show: !doc.show });
  }

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
    if (doc.embed.length === 0 || inputEmbed.length === 0 ) return
    let dots = []
    for (let index=0; index < doc.embed.length; index++) {
      // @ts-ignore
      const dot = dotProduct(doc.embed[index].values, inputEmbed)
      dots.push(dot)
    }
    const largestIdx = findIndexOfLargestNumber(dots)
    const docSplit = splitString(doc.text, 32)
    const selectedText = docSplit[largestIdx]
    console.log(dots, largestIdx, selectedText)
  }, [inputEmbed]) 

  return (
    <div className="h-dvh dt:h-full w-full flex flex-col dt:flex-row items-center justify-center">
      <div className="grow-0 w-full h-full basis-1/2 px-5 py-2 max-w-1/2 overflow-scroll">
        <p className="mb-2 px-1 tracking-wide">
          Paste your document below and generate the embeddings
        </p>
        <textarea
          className="w-full grow-0 resize-none p-2 border border-gray-400 rounded-lg"
          placeholder={doc_placeholder}
          value={doc.text}
          onChange={(e) => {
            setDoc({ ...doc, text: e.target.value });
          }}
          rows={26}
        />
        <div className="flex max-h-9 overflow-hidden">
          <div className="basis-[48%] flex justify-between pr-2">
            <button
              className="border border-gray-700 bg-gray-600 rounded-lg px-2 py-1 text-gray-100"
              onClick={() => {
                onDocSubmit();
              }}
            >
              Create Embeddings
            </button>
            <button
              className={`min-w-[68px] border border-gray-700 bg-gray-600 text-gray-100 rounded-lg px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50`}
              disabled={doc.embed.length == 0}
              onClick={() => {
                showEmbeddings();
              }}
            >
              {doc.show ? "Hide" : "Show"}
            </button>
          </div>
          {doc.embed.length === 0 ? (
            <></>
          ) : doc.show ? (
            <div className="basis-[52%] grow-0 overflow-hidden">
              <div className="h-full overflow-scroll rounded-lg border border-gray-400 bg-gray-300 text-sm text-gray-600 px-1 pt-1">
                <p>{JSON.stringify(doc.embed)}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="grow w-full h-full basis-1/2 max-w-1/2 flex">
        <div className="pb-8 pt-4 w-full px-2 flex flex-col-reverse">
          <ModelInput
            input={inputQuery}
            setInput={setInputQuery}
            onSubmit={onQuerySubmit}
            toggleParams={toggleModelParams}
            enabled={doc.embed.length > 0}
          />
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
          <div className="overflow-x-clip flex p-2 border border-gray-400 bg-white rounded-lg mx-2 grow overflow-y-scroll">
            {"history"}
          </div>
          <p className="-mt-2 mb-2 tracking-wide">Query the document below</p>
        </div>
      </div>
    </div>
  );
}
