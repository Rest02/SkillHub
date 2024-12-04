import React, { createContext, useContext, useState } from "react";
import { getCarrito, deleteFromCarrito, addToCarrito } from "../api/carrito.api.js"; // Importa la función de la API

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
      const data = await getCarrito(token);
      setCarrito(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para añadir un curso al carrito
  const addToCarritoContext = async (token, courseId) => {
    setLoading(true);
    setError(null);
    try {
      const message = await addToCarrito(token, courseId); // Llamada a la API
      alert(message); // Mostrar mensaje de éxito (opcional)
      await loadCarrito(token); // Recargar el carrito actualizado
    } catch (err) {
      setError(err.message); // Capturar errores
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un curso del carrito
  const removeFromCarrito = async (token, carritoId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteFromCarrito(token, carritoId);
      setCarrito((prevCarrito) =>
        prevCarrito.filter((item) => item.carrito_id !== carritoId)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Proveer estado y funciones al contexto
  return (
    <CarritoContext.Provider
      value={{
        carrito,
        loading,
        error,
        loadCarrito,
        addToCarritoContext,
        removeFromCarrito,
      }}
    >
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
