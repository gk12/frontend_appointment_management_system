import { useState } from "react";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { BrowserRouter } from "react-router-dom";
import UserAuthContextProvider from "./context/UserAuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserAuthContextProvider>
        <BrowserRouter>
          <AllRoutes />
          <ToastContainer />
        </BrowserRouter>
      </UserAuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
