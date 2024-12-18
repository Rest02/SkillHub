import React from "react";
import { FaStar } from "react-icons/fa"; // Importar iconos de estrellas

function ValoracionesEnInstructor() {
  // Función para renderizar las estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? "#ffc107" : "#e4e5e9"} />
    ));
  };
  return (
    <section className="relative flex flex-col justify-center bg-[#1f2937] overflow-hidden antialiased rounded-lg">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
          <div className="w-full max-w-3xl mx-auto">
            {/* Vertical Timeline #3 */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent pt-3">
              {/* Item #1 */}
              <div className="relative">
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
                      <svg
                        className="fill-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                      >
                        <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                      </svg>
                    </div>
                    {/* Date */}
                    <time className="text-sm font-medium text-indigo-500 md:w-28">
                      Apr 7, 2024
                    </time>
                  </div>
                  {/* Title and Stars */}
                  <div className="flex items-center ml-14">
                    <span className="text-white font-bold">
                      Tania Andrew
                    </span>
                    <div className="flex ml-2">
                      {renderStars(3)} {/* Ejemplo: 3 estrellas */}
                    </div>
                  </div>
                </div>
                {/* Card */}
                <div className="bg-white p-4 rounded border border-slate-200 text-black shadow ml-14 md:ml-44">
                  "I found solution to all my design needs from Creative Tim. I
                  use them as a freelancer in my hobby projects for fun! And its
                  really affordable, very humble guys !!!"
                </div>
              </div>
            </div>
            
            {/* End: Vertical Timeline #3 */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValoracionesEnInstructor;
