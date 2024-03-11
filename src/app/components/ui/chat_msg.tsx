import { marked } from "marked";
import Marked from "./marked";

export interface ChatMsgParams {
  role: string;
  msg: string;
}

export default function ChatMsg(params: ChatMsgParams) {
  const bgColor = params.role == "model" ? "bg-gray-300" : "bg-gray-200";

  return (
    <div
      className={`flex flex-col px-4 py-2 rounded-xl ${bgColor} mb-2 drop-shadow-sm`}
    >
      <div className="text-sm font-medium mb-1">{params.role}</div>
      <div>
        {Marked(marked.parse(params.msg) as string)}
      </div>
    </div>
  );
}
