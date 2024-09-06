import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";

function ForgetPassword() {
  const { forgetPasswordContext } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          await forgetPasswordContext(values);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Correo electrónico</label>
              <Field type="email" name="email" onChange={handleChange} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <button type="Submit">Enviar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgetPassword;
