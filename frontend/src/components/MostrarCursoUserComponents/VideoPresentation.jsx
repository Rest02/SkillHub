import React, { useState } from "react";
import { useCarrito } from "../../context/CarritoContext.jsx"; // Importa el hook para acceder al contexto

function VideoPresentation({ courseId }) {
  const [modalOpen, setModalOpen] = useState(false); // Estado para manejar la apertura del modal
  const { addToCarritoContext, loading, error } = useCarrito(); // Desestructura el contexto para obtener la función
  const token = localStorage.getItem("token"); // Obtén el token del usuario desde localStorage (o tu método de autenticación)

  const handleAddToCarrito = async () => {
    try {
      console.log("el curso id", courseId)
      await addToCarritoContext(token, courseId); // Llama a la función para agregar el curso al carrito
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  return (
    <div className="relative font-inter antialiased">
      <main className="relative flex flex-col justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-16">
          <div className="flex flex-col items-center">
            
            {/* Card with white background and black borders */}
            <div className="rounded-none border-2 border-black bg-white w-full max-w-lg mx-auto">
              
              {/* Video container */}
              <div className="w-full mb-4">
                <button
                  className="relative flex justify-center items-center focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 group"
                  onClick={() => setModalOpen(true)}
                  aria-controls="modal"
                  aria-label="Watch the video"
                >
                  <div className="rounded-none w-full h-80">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      loop
                    >
                      <source
                        src="https://cruip-tutorials.vercel.app/modal-video/video.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </button>
              </div>

              {/* Action Buttons below the video */}
              <div className="flex flex-col space-y-4 mb-4 px-6 py-4">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300">
                  Comprar
                </button>
                <button
                  onClick={handleAddToCarrito} // Llama a la función al hacer clic
                  className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition-colors duration-300"
                  disabled={loading} // Deshabilitar el botón mientras se carga
                >
                  {loading ? "Añadiendo..." : "Agregar al carrito"}
                </button>
              </div>

            </div> {/* End of the Card */}

          </div>
        </div>
      </main>
    </div>
  );
}

export default VideoPresentation;
