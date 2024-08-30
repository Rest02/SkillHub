import React from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Formik } from "formik";

function AuthPage() {
  const { registerUser } = useAuth();

  return (
    <div>
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          await registerUser(values);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Nombre de usuario</label>
            <input type="text" name="nombre" onChange={handleChange} />

            <label>Correo electrónico</label>
            <input type="email" name="email" onChange={handleChange} />

            <label>Contraseña</label>
            <input type="password" name="password" onChange={handleChange} />

            <button type="submit">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AuthPage;
