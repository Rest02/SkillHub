import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const loginUser = (req, res) => {
  res.json("Hola mundo logeando usuario");
};

export const registerUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  try{
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: "Nombre, email y contraseña son requeridos" });
      }


    const hashedPassword = await bcrypt.hash(password, 10)
    const [userRegister] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    if(userRegister.length > 0){
        return res.json({ message : "El usuario ya esta registrado en la base de datos"})
    }else{
        await pool.query("INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)",[nombre, email, hashedPassword])
        res.json("Usuario ingresado exitosamente")
    }
  }catch(error){
    return res.status(500).json({
        message: error.message
    })
  }
};
