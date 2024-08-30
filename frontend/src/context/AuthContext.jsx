import { createContext, useContext, useState } from "react";
import { registerUserApi } from "../api/auth.api";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El contexto tiene que estar dentro del provider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const registerUser = async (data) => {
    try {
      const response = await registerUserApi(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{registerUser}}>{children}</AuthContext.Provider>
  );
};
