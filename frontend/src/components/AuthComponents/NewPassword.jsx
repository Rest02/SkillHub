import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate y useParams

// Esquema de validación de Yup para la nueva contraseña
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
});

function NewPassword() {
  const { changePassword } = useAuth();
  const { token } = useParams(); // Obtén el token de la URL
  const navigate = useNavigate(); // Hook para redireccionar
  const [message, setMessage] = useState(""); // Estado para mensajes

  return (
    <div>
      <h2>Cambiar Contraseña</h2>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema} // Añadir el esquema de validación
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const { newPassword } = values;
            
            // Llamar a la función para cambiar la contraseña
            const response = await changePassword(newPassword, token);

            // Mensaje de éxito y redirección
            setMessage("Contraseña actualizada exitosamente. Redirigiendo...");
            setTimeout(() => {
              navigate('/login'); // Redirigir a la página de login
            }, 3000);
          } catch (error) {
            console.error("Error cambiando la contraseña:", error);
            setMessage("Ocurrió un error al cambiar la contraseña. Intenta nuevamente.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Nueva Contraseña</label>
              <Field
                type="password"
                name="newPassword"
                placeholder="Ingresa tu nueva contraseña"
                onChange={handleChange}
              />
              {errors.newPassword && touched.newPassword && (
                <div style={{ color: "red" }}>{errors.newPassword}</div>
              )}
            </div>

            <div>
              <label>Confirmar Contraseña</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu nueva contraseña"
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div style={{ color: "red" }}>{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Actualizando..." : "Cambiar Contraseña"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div style={{ color: message.includes("exitosamente") ? "green" : "red", marginTop: "10px" }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default NewPassword;
