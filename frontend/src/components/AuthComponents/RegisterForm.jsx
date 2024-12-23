import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterForm() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Estado para manejar la carga

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .matches(/^[a-zA-Z0-9-_]+$/, "El nombre solo puede contener letras, números, guiones y guiones bajos")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(10, "El nombre de usuario no debe superar los 10 caracteres")
      .required("El nombre de usuario es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
      )
      .required("La contraseña es obligatoria"),
  });

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-yellow-400 to-blue-700 justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">SkillHub</h1>
          <p className="text-white mt-1">Explora, aprende y crece con nosotros</p>
          <button
            type="button"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Leer más
          </button>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center py-10 items-center bg-white">
        <Formik
          initialValues={{ nombre: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);  // Activar el estado de carga
            try {
              await registerUser(values);
              toast.success("Redirigiendo a verificación", {
                position: "top-center",
                style: {
                  border: "1px solid black", // Color verde (puedes personalizar)
                },
              });

              // Retraso antes de redirigir
              setTimeout(() => {
                navigate("/verifycoderegister"); // Redirigir después de 2 segundos
              }, 2000);
            } catch (error) {
              console.error("Error al registrar al usuario:", error);
              toast.error("Error al registrarse. Intente de nuevo.", {
                position: "bottom-left", // Mensaje de error en la esquina inferior izquierda
              });
            } finally {
              setLoading(false);  // Desactivar el estado de carga
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-md p-8"
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                ¡Bienvenido de nuevo!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Crea una cuenta para comenzar
              </p>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <Field
                  name="nombre"
                  type="text"
                  placeholder="Nombre de usuario"
                  className="pl-2 outline-none border-none w-full"
                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"
                  className="pl-2 outline-none border-none w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <Field
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  className="pl-2 outline-none border-none w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className={`block w-full mt-4 py-2 rounded-2xl font-semibold mb-2 text-white transition-colors duration-300 ease-in-out ${
                  loading ? "bg-gray-500" : "bg-indigo-600"
                }`}
                disabled={loading}  // Deshabilitar el botón mientras se carga
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full border-4 border-t-4 border-white w-6 h-6"></div>
                  </div>
                ) : (
                  "Registrarse"
                )}
              </button>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                ¿Olvidaste tu contraseña?
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
