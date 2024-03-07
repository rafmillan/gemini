import { MutableRefObject, useEffect, useRef } from "react";
import ChatMsg from "./ui/chat_msg";
import LoadingText from "./ui/loading_text_skeleton";
import ChatMsgStream from "./ui/chat_msg_stream";

interface ChatHistoParams {
  history: { role: string; parts: string }[];
  loading: boolean;
  queryResult?: string;
}

export default function ChatHistory(params: ChatHistoParams) {
  let end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (end.current !== null) {
      end.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [params.history]);

  return (
    <div className="w-full h-full dt:w-full py-2 px-5 overflow-scroll -mt-2">
      {params.history.map((h: { role: string; parts: string }, idx: number) => {
        const last = idx == params.history.length - 1;
        return last ? (
          <div key={idx}>
            <ChatMsgStream role={h.role} msg={h.parts} />
          </div>
        ) : (
          <div key={idx}>
            <ChatMsgStream role={h.role} msg={h.parts} />
          </div>
        );
      })}
      {params.loading ? (
        <div
          className={`flex flex-col px-4 py-2 rounded-xl bg-gray-300 mb-2 drop-shadow-sm`}
        >
          <div className="text-sm font-medium">model</div>
          <LoadingText color="bg-gray-400" />
        </div>
      ) : (
        <></>
      )}
      <div className="invisible h-0" ref={end} />
    </div>
  );
}
