import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El contexto tiene que estar dentro del provider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ text: "Hola mundo", x: 100 }}>
      {children}
    </AuthContext.Provider>
  );
};
