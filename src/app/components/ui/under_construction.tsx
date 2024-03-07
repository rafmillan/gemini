import React from "react";
import { MdConstruction } from "react-icons/md";

export default function UnderConstruction() {
  return (
    <React.Fragment>
      <MdConstruction size={128} className="text-gray-500" />
      <h1 className="text-gray-500 font-medium tracking-wide text-3xl">
        Under Construction
      </h1>
    </React.Fragment>
  );
}
