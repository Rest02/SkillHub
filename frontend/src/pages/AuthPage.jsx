import React from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AuthPage() {
  const { registerUser } = useAuth();

  // Esquema de validación utilizando Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(8, "El nombre de usuario no debe superar los 8 caracteres")
      .required("El nombre de usuario es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          await registerUser(values);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Nombre de usuario</label>
              <Field type="text" name="nombre" onChange={handleChange} />
              <ErrorMessage name="nombre" component="div" className="error" />
            </div>

            <div>
              <label>Correo electrónico</label>
              <Field type="email" name="email" onChange={handleChange} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label>Contraseña</label>
              <Field type="password" name="password" onChange={handleChange} />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AuthPage;
