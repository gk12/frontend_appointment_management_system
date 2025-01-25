import React from "react";

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error?.message}</pre>
    </div>
  );
};

export default ErrorBoundaryFallback;
