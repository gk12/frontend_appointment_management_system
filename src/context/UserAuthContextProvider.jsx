import React, { useEffect, useState } from "react";
import UserAuthContext from "./UserAuthContext";
import { axiosInstance } from "../utils/axiosConfig";

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function authCheck() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("api/me");
      setUser(response.data.data);
      if (response.data.data) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function loginUser(data) {
    setUser(data);
    setIsAuthenticated(true);
  }
  async function logoutUser() {
    console.log("logout");
    const response = await axiosInstance.post("api/auth/logout");
    setUser(null);
  }

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <UserAuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuthenticated,
        authCheck,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
