// Perfil.jsx
import React, { useEffect, useState } from "react";
import { usePerfil } from "../../context/PerfilContext"; // Importar el contexto de perfil
import { Formik, Form, Field, ErrorMessage } from "formik"; // Importar Formik y sus componentes
import * as Yup from "yup"; // Importar Yup para validaciones

function Perfil() {
  const { perfil, getPerfil, loading, error, updateEmail } = usePerfil(); // Asegúrate de obtener updateEmail desde el contexto
  const [showEmailForm, setShowEmailForm] = useState(false); // Estado para mostrar u ocultar el formulario

  useEffect(() => {
    // Obtener los datos del perfil cuando se monte el componente
    if (!perfil) {
      getPerfil();
    }
  }, [perfil, getPerfil]); // Depender de perfil y getPerfil

  if (loading) {
    return <div>Cargando perfil...</div>; // Mostrar un mensaje de carga mientras obtenemos los datos
  }

  if (error) {
    return <div>{error}</div>; // Mostrar un error si algo sale mal
  }

  if (!perfil) {
    return <div>No se pudo obtener el perfil.</div>; // Si no hay perfil, muestra un mensaje de error
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

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <p>
        <strong>Nombre:</strong> {perfil.nombre}
      </p>
      <p>
        <strong>Email:</strong> {perfil.email}
      </p>
      <p>
        <strong>Rol:</strong> {perfil.rol}
      </p>

      {/* Opciones de cambios */}
      <div style={{ marginTop: "20px" }}>
        <h3>Opciones de Configuración</h3>
        <button onClick={() => setShowEmailForm(!showEmailForm)}>
          {showEmailForm ? "Cancelar" : "Cambiar correo vinculado"}
        </button>

        {showEmailForm && (
          <Formik
            initialValues={{ newEmail: "" }}
            validationSchema={validationSchema}
            onSubmit={handleEmailChange}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="newEmail">Nuevo correo electrónico:</label>
                  <Field
                    type="email"
                    name="newEmail"
                    placeholder="Ingrese su nuevo correo"
                  />
                  <ErrorMessage
                    name="newEmail"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Actualizar Correo
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Otras opciones */}
        <br />
        <button onClick={() => alert("Cambiar contraseña")}>
          Cambiar contraseña
        </button>
        <br />
        <button onClick={() => alert("Cambiar nombre de usuario")}>
          Cambiar nombre de usuario
        </button>
        <br />
        <button onClick={() => alert("Cambiar rol a instructor")}>
          Cambiar rol a instructor
        </button>
      </div>
    </div>
  );
}

export default Perfil;
