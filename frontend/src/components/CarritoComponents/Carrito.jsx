import React, { useEffect } from "react";
import { useCarrito } from "../../context/CarritoContext.jsx";

function Carrito() {
  const { carrito, loading, error, loadCarrito, removeFromCarrito, handlePayment } = useCarrito();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      loadCarrito(token);
    }
  }, [token]);

  if (loading) {
    return <p>Cargando carrito...</p>;
  }

  if (error) {
    return <p>Error al cargar el carrito: {error}</p>;
  }

  const handleRemoveItem = (carritoId) => {
    if (!token) return; // Validar que el token exista
    removeFromCarrito(token, carritoId); // Llamar a la función del contexto
  };


  const handlePaymentClick = () => {
    const courseIds = carrito.map((producto) => producto.course_id).filter(id => id != null && id !== "");
    console.log("Course IDs validos:", courseIds); // Verifica los IDs antes de enviarlos
  
    const token = localStorage.getItem("token");
  
    if (courseIds.length > 0) {
      handlePayment(token, courseIds);  // Llamar a handlePayment con los courseIds válidos
    } else {
      console.log("No hay cursos válidos en el carrito");
    }
  };
  
  
  
  


  // Si el carrito está vacío, mostrar un mensaje
  if (carrito.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500">Parece que aún no has añadido ningún curso.</p>
          <p className="text-gray-500">¡Explora nuestros cursos y añade algunos a tu carrito!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {carrito.map((producto) => (
            <div
              key={`${producto.carrito_id}`} // Usar carrito_id como key único
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                src={`http://localhost:4000/${producto.imagen}`}
                alt={producto.nombre}
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {producto.nombre}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">
                    {producto.descripcion}
                  </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    {/* Controles de cantidad */}
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      -
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={producto.cantidad || 1}
                      readOnly
                    />
                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      +
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {(producto.precio || 0).toLocaleString()} CLP
                    </p>
                    {/* Botón "X" para eliminar */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => handleRemoveItem(producto.carrito_id)} // Llamar a handleRemoveItem con carrito_id
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {carrito
                .reduce(
                  (total, item) =>
                    total + (item.precio || 0) * (item.cantidad || 1),
                  0
                )
                .toLocaleString()}{" "}
              CLP
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {(
                  carrito.reduce(
                    (total, item) =>
                      total + (item.precio || 0) * (item.cantidad || 1),
                    0
                  )
                ).toLocaleString()}{" "}
                CLP
              </p>
              <p className="text-sm text-gray-700">incluyendo IVA</p>
            </div>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handlePaymentClick} // Llamar a handlePayment al hacer clic
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
