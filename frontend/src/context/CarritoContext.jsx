import React, { createContext, useContext, useState } from "react";
import { getCarrito } from "../api/carrito.api.js"; // Importa la función de la API

// Crear el contexto
const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar el carrito del usuario
  const loadCarrito = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCarrito(token); // Llamada a la API
      setCarrito(data); // Actualizar el estado con los datos del carrito
    } catch (err) {
      setError(err.message); // Capturar el error
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Proveer estado y funciones al contexto
  return (
    <CarritoContext.Provider value={{ carrito, loading, error, loadCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
};
