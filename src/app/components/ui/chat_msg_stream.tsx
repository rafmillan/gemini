import Marked from "./marked";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { ChatMsgParams } from "./chat_msg";

// Double printing only shows on next dev, this is OK in prod.
// https://react.dev/reference/react/StrictMode
export default function ChatMsgStream(params: ChatMsgParams) {
  
  const [output, setOutput] = useState("")
  
  useEffect(() => {
    if (params.msg === "" || params.msg.length === 0) return;

    for (let i = 0; i < params.msg.length; i++) {
      setTimeout(() => {
        setOutput((prev) => prev + params.msg[i]);
      }, i * 10);
    }
  }, [params.msg]);

  const bgColor = params.role == "model" ? "bg-gray-300" : "bg-gray-200";

  return (
    <div
      className={`flex flex-col px-4 py-2 rounded-xl ${bgColor} mb-2 drop-shadow-sm`}
    >
      <div className="text-sm font-medium mb-1">{params.role}</div>
      <div>
        {Marked(marked.parse(output) as string)}
      </div>
    </div>
  );
}
