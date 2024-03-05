interface LoadingTextParams {
  color?: string,
}

export default function LoadingText(params: LoadingTextParams) {
  const bgColor = params.color === undefined ? "bg-gray-300" : params.color
  return (
    <div className="animate-pulse w-full h-full py-1">
      {
        //<div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
        //<div className="w-full h-8 bg-gray-300 rounded mb-2"></div>
      }
      <div className={`w-full h-6 ${bgColor} rounded`}></div>
      {
        //<div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      }
    </div>
  );
}
