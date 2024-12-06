// Perfil.jsx
import React, { useEffect, useState } from "react";
import { usePerfil } from "../../context/PerfilContext"; // Importar el contexto de perfil
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación
import { Formik, Form, Field, ErrorMessage } from "formik"; // Importar Formik y sus componentes
import * as Yup from "yup"; // Importar Yup para validaciones

function Perfil() {
  const { perfil, getPerfil, loading, error, updateEmail } = usePerfil(); // Asegúrate de obtener updateEmail desde el contexto
  const { updateRole } = useAuth(); // Obtener la función updateRole desde el contexto
  const [showEmailForm, setShowEmailForm] = useState(false); // Estado para mostrar u ocultar el formulario

  useEffect(() => {
    if (!perfil) {
      getPerfil();
    }
  }, [perfil, getPerfil]); // Depender de perfil y getPerfil

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Cargando perfil...</div>; // Mostrar un mensaje de carga mientras obtenemos los datos
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Mostrar un error si algo sale mal
  }

  if (!perfil) {
    return <div className="text-center text-red-500">No se pudo obtener el perfil.</div>; // Si no hay perfil, muestra un mensaje de error
  }

  // Esquema de validación de Yup para el correo electrónico
  const validationSchema = Yup.object().shape({
    newEmail: Yup.string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es requerido"),
  });

  const handleEmailChange = async (values, { setSubmitting, setErrors }) => {
    try {
      await updateEmail(values.newEmail);
      setShowEmailForm(false); // Ocultar el formulario si todo es correcto
    } catch (error) {
      setErrors({ newEmail: "No se pudo actualizar el correo" });
    } finally {
      setSubmitting(false); // Terminar la acción de submit
    }
  };

  const changeRole = () => {
    const userId = perfil.id; // ID del usuario actual
    const newRole = perfil.rol === 'estudiante' ? 'instructor' : 'estudiante'; // Determina el nuevo rol

    updateRole(userId, newRole); // Llama a la función de contexto para cambiar el rol
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-[#07074D]">Perfil del Usuario</h2>
      <div className="my-4">
        <p className="text-lg">
          <strong className="font-medium">Nombre:</strong> {perfil.nombre}
        </p>
        <p className="text-lg">
          <strong className="font-medium">Email:</strong> {perfil.email}
        </p>
        <p className="text-lg">
          <strong className="font-medium">Rol:</strong> {perfil.rol}
        </p>
      </div>

      {/* Opciones de cambios */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#07074D]">Opciones de Configuración</h3>

        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {showEmailForm ? "Cancelar" : "Cambiar correo vinculado"}
        </button>

        {showEmailForm && (
          <Formik
            initialValues={{ newEmail: "" }}
            validationSchema={validationSchema}
            onSubmit={handleEmailChange}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4">
                <div className="mb-4">
                  <label htmlFor="newEmail" className="block text-base font-medium text-[#07074D]">
                    Nuevo correo electrónico:
                  </label>
                  <Field
                    type="email"
                    name="newEmail"
                    placeholder="Ingrese su nuevo correo"
                    className="w-full mt-2 px-4 py-3 border border-[#e0e0e0] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <ErrorMessage
                    name="newEmail"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Actualizar Correo
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Otras opciones */}
        <div className="mt-6">
          <button
            onClick={() => alert("Cambiar contraseña")}
            className="w-full mb-4 px-6 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition duration-300"
          >
            Cambiar contraseña
          </button>
          <button
            onClick={() => alert("Cambiar nombre de usuario")}
            className="w-full mb-4 px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Cambiar nombre de usuario
          </button>
          <button
            onClick={changeRole} // Llamar a la función changeRole cuando se hace clic
            className="w-full mb-4 px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300"
          >
            Cambiar rol a {perfil.rol === 'estudiante' ? 'Instructor' : 'Estudiante'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
