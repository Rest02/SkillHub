import axios from 'axios'


export const registerUser = async(nombre, email, password) =>{
    return await axios.post(`http://localhost:4000/register/${nombre}/${email}/${password}`)
}



export const loginUser = async() =>{
    return await axios.post(`http://localhost:4000/login/${email, password}`)
}