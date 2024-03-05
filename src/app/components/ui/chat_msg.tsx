interface ChatMsgParams {
  role: string;
  msg: string;
}

export default function ChatMsg(params: ChatMsgParams) {
  const bgColor = params.role == "model" ? "bg-gray-300" : "bg-gray-200";

  return (
    <div
      className={`flex flex-col px-4 py-2 rounded-xl ${bgColor} mb-2 drop-shadow-sm`}
    >
      <div className="text-sm font-medium">{params.role}</div>
      <div>{params.msg}</div>
    </div>
  );
}
