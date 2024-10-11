import React, { useState } from "react"; // Importa useState
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Importa Yup para validaciones
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate y useParams

// Esquema de validación de Yup
const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("El código es obligatorio") // Campo obligatorio
    .length(6, "El código debe tener 6 dígitos"), // Validación de longitud
});

function VerifyCode() {
  const { verifyRecoveryCode } = useAuth();
  const { token } = useParams(); // Obtén el token de la URL
  const navigate = useNavigate(); // Hook para redireccionar
  const [message, setMessage] = useState(""); // Estado para mensajes

  return (
    <div>
      <Formik
        initialValues={{ code: "" }}
        validationSchema={validationSchema} // Añadir el esquema de validación
        onSubmit={async (values) => {
          try {
            const numericCode = Number(values.code); // Convertir el código ingresado a número
            
            // Verifica el código
            const response = await verifyRecoveryCode(numericCode, token); // Llamar a la función con el código convertido
            
            if (response.valid) {
              // Si la verificación es exitosa, redirigir a la página de registro (puedes cambiar a changePassword más tarde)
              setMessage("Código verificado correctamente. Redirigiendo...");
              navigate('/register');
            } else {
              // Manejar el error de código inválido
              setMessage(response.message || "Código inválido. Por favor, inténtalo de nuevo."); // Establece el mensaje de error
            }
          } catch (error) {
            console.error("Error en la verificación del código:", error.message);
            setMessage("Ocurrió un error inesperado. Intenta nuevamente."); // Mensaje de error general
          }
        }}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Código de Recuperación</label>
              <Field
                type="text"
                name="code"
                placeholder="Ingresa el código"
                onChange={handleChange}
              />
              {/* Mostrar el mensaje de error si existe */}
              {errors.code && touched.code && (
                <div style={{ color: "red" }}>{errors.code}</div>
              )}
            </div>

            <button type="submit">Verificar Código</button>
          </Form>
        )}
      </Formik>

      {/* Mostrar mensaje de éxito o error */}
      {message && <div style={{ color: message.includes("Código verificado correctamente") ? "green" : "red", marginTop: "10px" }}>{message}</div>}
    </div>
  );
}

export default VerifyCode;
