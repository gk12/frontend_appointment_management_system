import React, { Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "./Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

const ProtectedRouteWrapper = ({ children }) => {
  return (
    <ProtectedRoute
      element={
        <Suspense fallback={<Loader />}>
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => {}}
          >
            {children}
          </ErrorBoundary>
        </Suspense>
      }
    />
  );
};

export default ProtectedRouteWrapper;
