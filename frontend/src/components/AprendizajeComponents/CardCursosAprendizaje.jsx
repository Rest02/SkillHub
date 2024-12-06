import React, { useEffect, useState } from "react";
import { useAprendizaje } from "../../context/AprendizajeContext.jsx";
import { useNavigate } from "react-router-dom";

const Aprendizaje = () => {
  const { courses = [], loading, error, getCourses } = useAprendizaje();
  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8; // 8 cursos por página (4 cards por columna, 2 columnas)
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getCourses(token);
    }
  }, [token]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>No tienes cursos.</div>;
  }

  // Paginación: obtener los cursos de la página actual
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="container px-6 py-10 mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-black text-center">
          Cursos que has comprado
        </h1>

        {/* Grid con 2 columnas y 4 cards por columna */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {currentCourses.map((course, index) => (
            <div
              key={`${course.id}-${index}`}
              className="lg:flex p-4 cursor-pointer"
              onClick={() => navigate(`/hacercurso/${course.id}`)}
            >
              <img
                className="object-cover w-24 h-24 rounded-lg lg:w-32 lg:h-32 border border-black"
                src={`http://localhost:4000/${course.imagen_portada}`}
                alt={course.titulo}
              />
              <div className="flex flex-col justify-between py-2 px-4">
                <h2 className="text-lg font-semibold text-gray-800 hover:underline dark:text-black">
                  {course.titulo}
                </h2>
                <span className="text-sm text-gray-500 ">
                  {new Date(course.fecha_inscripcion).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Component */}
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <nav>
          <ul className="flex">
            <li>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                aria-label="Previous"
              >
                <span className="material-icons text-sm">↞</span>
              </a>
            </li>

            {/* Paginación de las páginas */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <a
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                    currentPage === index + 1
                      ? "bg-pink-500 text-white"
                      : "border border-black bg-transparent text-blue-gray-500"
                  } p-0 text-sm transition duration-150 ease-in-out hover:bg-light-300`}
                  href="#"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}

            <li>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
                onClick={() =>
                  paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
                }
                aria-label="Next"
              >
                <span className="material-icons text-sm">↠</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Aprendizaje;
