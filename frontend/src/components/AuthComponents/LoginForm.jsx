import React from "react";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { useAuth } from "../../context/AuthContext.jsx";
import * as Yup from "yup";

function LoginForm() {
  const { loginUser } = useAuth();

  const validationSchema = Yup.object({
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
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          await loginUser(values);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Correo Electronico</label>
              <Field type="email" name="email" onChange={handleChange} />
              <ErrorMessage name = "email" component="div" className="error"/>
            </div>

            <div>
              <label>Contraseña</label>
              <Field type="password" name="password" onChange={handleChange} />
              <ErrorMessage name = "password" component="div" className="error"/>

            </div>

            <button type="submit">Entrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
