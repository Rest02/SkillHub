import axios from "axios";


// Register and login

export const registerUserApi = async (user) => {
  return await axios.post("http://localhost:4000/register", user);
};

export const loginUserApi = async (user) => {
  return await axios.post("http://localhost:4000/login/", user);
};


// Forget Password

export const forgetPasswordApi = async (email) =>{
  return await axios.post("http://localhost:4000/ForgetPassword/", email)
}