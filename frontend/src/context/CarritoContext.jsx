import React, { createContext, useContext, useState } from "react";
import { getCarrito, deleteFromCarrito, addToCarrito, handlePaymentApi  } from "../api/carrito.api.js"; // Importa la función de la API

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
      if (data && data.length > 0) {
        setCarrito(data);  // Si el carrito tiene productos, actualiza el estado
      } else {
        setCarrito([]);  // Si el carrito está vacío, establece un carrito vacío
      }
    } catch (err) {
      setError("No carrito found");  // Error específico si no se encuentra el carrito
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
      await deleteFromCarrito(token, carritoId);  // Llamada a la API para eliminar el curso
      setCarrito((prevCarrito) => prevCarrito.filter((item) => item.carrito_id !== carritoId));  // Actualiza el estado
    } catch (err) {
      setError(err.message);  // Si hay un error, lo capturas
    } finally {
      setLoading(false);
    }
  };
  
  // Función para procesar el pago (inscripción a los cursos)
  const handlePayment = async (token, courseIds) => {
    setLoading(true);
    setError(null);
    try {
      const message = await handlePaymentApi(token, courseIds); // Llamada a la API para procesar el pago
      alert(message); // Mostrar mensaje de éxito (opcional)
      await loadCarrito(token); // Recargar el carrito después del pago
    } catch (err) {
      setError(err.message); // Capturar errores
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
        handlePayment
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
