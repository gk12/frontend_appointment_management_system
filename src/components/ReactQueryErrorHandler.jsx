import React from "react";

const ReactQueryErrorHandler = ({ error }) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl">{error}</h1>
      </div>
    </div>
  );
};

export default ReactQueryErrorHandler;
