interface LoadingTextParams {
  color?: string,
  numLines?: number,
}

export default function LoadingText(params: LoadingTextParams) {
  const bgColor = params.color === undefined ? "bg-gray-300" : params.color
  return (
    <div className="animate-pulse w-full h-full py-1">
      {/*<div className={`w-2/3 h-4 ${bgColor}  rounded mb-2`}></div> */}
      { (params.numLines && params.numLines === 2) ? <div className={`w-full h-6 ${bgColor}  rounded mb-2`}/> : <></>}
      <div className={`w-full h-6 ${bgColor} rounded`}></div>
      {/* <div className={`w-1/2 h-6 ${bgColor}  rounded`}></div> */}
    </div>
  );
}
