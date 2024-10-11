import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Importa Yup para validaciones
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la redirección

// Esquema de validación de Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("El correo no es válido") // Validación de email
    .required("El correo es obligatorio"), // Campo obligatorio
});

function ForgetPassword() {
  const { forgetPassword } = useAuth();
  const navigate = useNavigate(); // Hook para redireccionar

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema} // Añadir el esquema de validación
        onSubmit={async (values) => {
          const token = await forgetPassword(values);
          if (token) {
            // Redirigir a VerifyCode con el token
            navigate(`/verifyRecoveryCode/${token}`);
          }
        }}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Correo Electrónico</label>
              <Field
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                onChange={handleChange}
              />
              {/* Mostrar el mensaje de error si existe */}
              {errors.email && touched.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
            </div>

            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgetPassword;
