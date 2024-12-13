import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx"; // Importar el contexto
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik"; // Importar Formik
import * as Yup from "yup"; // Importar Yup para validación
import toast from 'react-hot-toast'; // Importar react-hot-toast

function VerifyCodeRegister() {
  const { verifyUser } = useAuth(); // Usar la función verifyUser del contexto
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Validación con Yup
  const validationSchema = Yup.object({
    code1: Yup.string()
      .required("")
      .matches(/^\d$/, "Must be a number")
      .length(1, "Must be 1 digit"),
    code2: Yup.string()
      .required("")
      .matches(/^\d$/, "Must be a number")
      .length(1, "Must be 1 digit"),
    code3: Yup.string()
      .required("")
      .matches(/^\d$/, "Must be a number")
      .length(1, "Must be 1 digit"),
    code4: Yup.string()
      .required("")
      .matches(/^\d$/, "Must be a number")
      .length(1, "Must be 1 digit"),
    code5: Yup.string()
      .required("")
      .matches(/^\d$/, "Must be a number")
      .length(1, "Must be 1 digit"),
    code6: Yup.string()
      .required("")
      .matches(/^\d$/, "Must be a number")
      .length(1, "Must be 1 digit"),
  });

  // Función para manejar el tabulado automático
  const handleTab = (e, nextFieldId, prevFieldId) => {
    if (e.key === "Backspace" && e.target.value === "") {
      // Regresar al campo anterior si se presiona 'Backspace' y el campo está vacío
      const prevField = document.getElementById(prevFieldId);
      if (prevField) prevField.focus();
    } else if (e.key !== "Backspace" && e.target.value.length === 1) {
      // Mover al siguiente campo si se ingresa un número
      const nextField = document.getElementById(nextFieldId);
      if (nextField) nextField.focus();
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4 md:px-0">
      <div className="bg-slate-700 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="flex w-full flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-white">
              <p>Verificación de código</p>
            </div>
            <div className="text-sm font-medium text-gray-400">
              <p>Te hemos enviado un correo con el código de validación</p>
            </div>
          </div>

          <div>
            <Formik
              initialValues={{
                code1: "",
                code2: "",
                code3: "",
                code4: "",
                code5: "",
                code6: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setLoading(true);
                setError("");
                setMessage("");

                const verificationCode = `${values.code1}${values.code2}${values.code3}${values.code4}${values.code5}${values.code6}`;

                try {
                  const response = await verifyUser(verificationCode); // Verificar el código
                  console.log("Response:", response.message); // Asegúrate de que estás viendo la respuesta correcta

                  // Comprobar si el mensaje de éxito está presente
                  if (
                    response.message ===
                    "Usuario verificado y registrado exitosamente."
                  ) {
                    setMessage("Account verified successfully.");

                    // Mostrar el toast
                    toast.success("Codigo Correcto, Redirigiendo", {
                        position: "top-center",
                        style: {
                          border: "1px solid black", // Color verde (puedes personalizar)
                        },
                      });

                    // Redirigir después de un pequeño retraso
                    setTimeout(() => {
                      navigate("/"); // Redirigir a la página de inicio
                    }, 2000); // Esperar 2 segundos
                  }
                } catch (error) {
                  setError("Error verificano el codigo. Intenta nuevamente.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex flex-col space-y-8">
                    <div className="flex items-center justify-center space-x-2 md:space-x-4">
                      {/* Inputs de 6 dígitos con espacio entre ellos */}
                      {[
                        "code1",
                        "code2",
                        "code3",
                        "code4",
                        "code5",
                        "code6",
                      ].map((name, index) => (
                        <div key={index} className="w-10 h-10 md:w-16 md:h-16">
                          <Field
                            className="w-full h-full text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            name={name}
                            id={name}
                            maxLength="1" // Permitir solo un carácter
                            onKeyDown={
                              (e) =>
                                handleTab(e, `code${index + 2}`, `code${index}`) // Mover al siguiente campo
                            }
                            onInput={(e) => {
                              // Permitir solo números
                              e.target.value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                            }}
                          />
                          <ErrorMessage
                            name={name}
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-5">
                      {/* Mensaje de error o éxito */}
                      {error && <p className="text-red-500">{error}</p>}
                      {message && <p className="text-green-500">{message}</p>}

                      <div>
                        <button
                          type="submit"
                          className="w-full py-3 md:py-4 bg-blue-700 border-none text-white text-sm md:text-base rounded-xl shadow-sm"
                          disabled={isSubmitting || loading} // Deshabilitar el botón si está cargando
                        >
                          {loading ? "Verificando" : "Verificar Cuenta"}
                        </button>
                      </div>

                      <div className="text-sm font-medium text-gray-500 text-center">
                        <p>
                          ¿No has recibido el código?{" "}
                          <a
                            className="text-blue-600"
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Reenviar
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCodeRegister;
