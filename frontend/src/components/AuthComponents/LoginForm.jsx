import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  // Usamos useRef para guardar si el mensaje ya fue mostrado
  const messageShownRef = useRef(false); 

  useEffect(() => {
    // Verifica si existe el mensaje y si no se ha mostrado aún
    if (location.state?.message && !messageShownRef.current) {
      toast.success(location.state.message, {
        position: "top-center",
        style: {
          border: "1px solid black",
        },
      });
      messageShownRef.current = true;  // Marca como mostrado para evitar que se repita
    }
  }, [location.state]); // Solo dispara si cambia location.state

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      {/* Imagen a la izquierda */}
      <div className="hidden lg:block w-1/2 h-screen">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Formulario a la derecha */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Iniciar Sesión</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await loginUser(values);
              navigate("/");
            } catch (error) {
              console.error("Error al iniciar sesión", error);
              toast.error("Error al iniciar sesión. Verifica tus datos.", {
                position: "top-center",
              });
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* Campo de correo */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Correo Electrónico
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Campo de contraseña */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">
                  Contraseña
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Recordarme */}
              <div className="mb-4 flex items-center">
                <Field
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="text-red-500"
                />
                <label htmlFor="remember" className="text-gray-600 ml-2">
                  Recordarme
                </label>
              </div>

              {/* ¿Olvidaste tu contraseña? */}
              <div className="mb-6 text-blue-500">
                <Link to="/forgetPassword" className="hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón de inicio de sesión */}
              <button
                type="submit"
                className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              >
                Entrar
              </button>
            </Form>
          )}
        </Formik>

        {/* ¿No tienes cuenta? */}
        <div className="mt-6 text-green-500 text-center">
          <Link to="/register" className="hover:underline">
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
