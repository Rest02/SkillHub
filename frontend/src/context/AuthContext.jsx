import { createContext, useContext } from "react";
import { registerUserApi, loginUserApi, forgetPasswordApi, validateCodeApi} from "../api/auth.api";

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

  const loginUser = async(data) => {
    try{
      const response = await loginUserApi(data)
      localStorage.setItem('token', response.data.token);
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  const forgetPasswordContext = async(email) => {
    try{
      const response = forgetPasswordApi(email)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  
  const validateCodeContext = async (data) => {
    try {
      const response = await validateCodeApi(data);
      return response.data.message.includes("Código válido");
    } catch (error) {
      console.log(error);
      return false
    }
  };
  

  return (
    <AuthContext.Provider value={{registerUser, loginUser, forgetPasswordContext, validateCodeContext}}>{children}</AuthContext.Provider>
  );
};
