import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import { BrowserRouter } from "react-router-dom";
import UserAuthContextProvider from "./context/UserAuthContextProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
