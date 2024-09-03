import axios from "axios";

export const registerUserApi = async (user) => {
  return await axios.post("http://localhost:4000/register", user);
};

export const loginUserApi = async (user) => {
  return await axios.post("http://localhost:4000/login/", user);
};

