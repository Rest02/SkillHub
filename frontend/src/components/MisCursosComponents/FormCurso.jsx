import React, { useState, useContext, useEffect, useRef } from "react";
import { MisCursosContext } from "../../context/MisCursosContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import anime from "animejs";
import { toast } from "react-hot-toast"; // Importar toast

const validationSchema = Yup.object({
  titulo: Yup.string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .test(
      "no-html",
      "El título no debe contener etiquetas HTML o símbolos como < o >",
      (value) => !/[<>]/.test(value) // Prohibir directamente los caracteres < o >
    )
    .test(
      "no-forbidden-words",
      "El título contiene palabras no permitidas",
      (value) => {
        const forbiddenWords = ["select", "drop"];
        return !forbiddenWords.some((word) =>
          value?.toLowerCase().includes(word)
        );
      }
    ),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .test(
      "no-html",
      "La descripción no debe contener etiquetas HTML o símbolos como < o >",
      (value) => !/[<>]/.test(value) // Prohibir directamente los caracteres < o >
    ),
  categoriaId: Yup.string().required("Selecciona una categoría"),
  precio: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser un número positivo")
    .integer("El precio debe ser un número entero"),
  modalidad: Yup.string().required("La modalidad es obligatoria"),
});

function FormCurso() {
  const { createCourse, categorias } = useContext(MisCursosContext);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const formRef = useRef(null); // Referencia para el formulario

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = (values) => {
    const courseData = {
      titulo: values.titulo,
      descripcion: values.descripcion,
      categoria_id: values.categoriaId,
      precio: values.precio,
      modalidad: values.modalidad,
    };

    // Llamada al servidor para crear el curso
    createCourse(courseData, thumbnail)
      .then((response) => {
        // Si la creación es exitosa, mostrar una alerta de éxito
        toast.success("Curso creado exitosamente, redirigiendo tus cursos", {
          position: "bottom-right",
          duration: 2000, // Mostrar la alerta por 2 segundos
        });
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate("/miscursos");
        }, 2000);
      })
      .catch((error) => {
        // Si hay un error, mostrar una alerta de error
        toast.error("Error al crear el curso, el formulario contiene errores", {
          duration: 2000, // Mostrar la alerta por 2 segundos
        });
      });
  };

  // Animar entrada del formulario al cargar
  useEffect(() => {
    anime({
      targets: formRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <div
      ref={formRef}
      className="max-w-4xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg mt-10 mb-10"
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        Crear un Curso Nuevo
      </h2>
      <Formik
        initialValues={{
          titulo: "",
          descripcion: "",
          categoriaId: "",
          precio: "",
          modalidad: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            {/* Título */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Título del Curso
              </label>
              <input
                type="text"
                name="titulo"
                placeholder="Ej. Curso de JavaScript Avanzado"
                value={values.titulo}
                onChange={(e) => {
                  handleChange(e);
                  if (errors.titulo) {
                    // Animar campo con error
                    anime({
                      targets: e.target,
                      translateX: [-10, 10, 0],
                      duration: 300,
                      easing: "easeInOutSine",
                    });
                  }
                }}
                onBlur={(e) => {
                  handleBlur(e);
                  if (errors.titulo) {
                    // Mostrar animación si hay error al perder foco
                    anime({
                      targets: e.target,
                      scale: [1, 1.05, 1],
                      duration: 300,
                      easing: "easeInOutSine",
                    });
                  }
                }}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.titulo && errors.titulo && (
                <p className="text-red-400 text-sm mt-1">{errors.titulo}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Descripción</label>
              <textarea
                name="descripcion"
                rows="4"
                placeholder="Describe el contenido del curso"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.descripcion && errors.descripcion && (
                <p className="text-red-400 text-sm mt-1">{errors.descripcion}</p>
              )}
            </div>

            {/* Categoría */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Categoría</label>
              <select
                name="categoriaId"
                value={values.categoriaId}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" label="Selecciona una categoría" />
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              {touched.categoriaId && errors.categoriaId && (
                <p className="text-red-400 text-sm mt-1">{errors.categoriaId}</p>
              )}
            </div>

            {/* Precio */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Precio</label>
              <input
                type="number"
                name="precio"
                placeholder="Ej. 100"
                value={values.precio}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.precio && errors.precio && (
                <p className="text-red-400 text-sm mt-1">{errors.precio}</p>
              )}
            </div>

            {/* Modalidad */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Modalidad</label>
              <select
                name="modalidad"
                value={values.modalidad}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" label="Selecciona la modalidad" />
                <option value="continuo">Continuo</option>
                <option value="completo">Completo</option>
              </select>
              {touched.modalidad && errors.modalidad && (
                <p className="text-red-400 text-sm mt-1">{errors.modalidad}</p>
              )}
            </div>

            {/* Subir Imagen */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">
                Subir Imagen de Portada
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="text-white"
              />
              {thumbnail && (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Preview"
                  className="mt-4 rounded-md shadow-md w-full max-h-64 object-cover"
                />
              )}
            </div>

            {/* Botón Enviar */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-300"
            >
              Crear Curso
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormCurso;
