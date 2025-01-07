import React, { useEffect, useState } from "react";
import UserAuthContext from "./UserAuthContext";
import { axiosInstance } from "../utils/axiosConfig";

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function authCheck() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("api/me");
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function loginUser(data) {
    setUser(data);
  }
  async function logoutUser() {
    const response = await axiosInstance.get("api/auth/logout");
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
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
