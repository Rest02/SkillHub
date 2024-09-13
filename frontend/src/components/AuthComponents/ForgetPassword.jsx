import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

function ForgetPassword() {
  const { forgetPasswordContext, validateCodeContext } = useAuth(); // Se asume que tienes otra función para validar el código
  const [isCodeSent, setIsCodeSent] = useState(false); // Estado para controlar si el código fue enviado
  const [emailStored, setEmailStored] = useState(""); // Guardar el email para reusarlo después

  const initialValues = {
    email: "",
    code: "", // Campo para el código de verificación
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    code: isCodeSent
      ? Yup.string().required("El código es obligatorio")
      : null, // Validación condicional para el código
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (!isCodeSent) {
            // Fase 1: Enviar correo de recuperación
            await forgetPasswordContext(values.email);
            setIsCodeSent(true); // Cambia el estado para mostrar el campo de código
            setEmailStored(values.email); // Guarda el email para reutilizarlo en la validación
          } else {
            // Fase 2: Validar el código de verificación
            const data = {
              email: emailStored,
              code: values.code
            };
            const isValid = await validateCodeContext(data);

            if (isValid) {
              alert("Código válido, ahora proceda a cambiar la contraseña");
              // Aquí puedes redirigir al usuario a la página de cambio de contraseña
            } else {
              alert("Código incorrecto, por favor intenta de nuevo");
            }
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Fase 1: Mostrar el campo del correo */}
            <div>
              <label>Correo electrónico</label>
              <Field
                type="email"
                name="email"
                onChange={handleChange}
                disabled={isCodeSent} // Deshabilitar campo email una vez que el código fue enviado
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            {/* Fase 2: Mostrar el campo del código de verificación si el email fue enviado */}
            {isCodeSent && (
              <div>
                <label>Código de verificación</label>
                <Field type="text" name="code" onChange={handleChange} />
                <ErrorMessage name="code" component="div" className="error" />
              </div>
            )}

            {/* Botón que cambia de función según el estado */}
            <button type="Submit">
              {isCodeSent ? "Validar Código" : "Enviar Correo"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgetPassword;
