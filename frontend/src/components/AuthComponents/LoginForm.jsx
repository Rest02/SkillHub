import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuth } from "../../context/AuthContext.jsx";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Grid,
  Paper,
  Stack,
  InputAdornment,
} from "@mui/material";
import picture from "../../assets/img/foto.jpg"; // Imagen de la foto (a la izquierda)
import logo from "../../assets/img/logo.png"; // Logo que irá arriba del formulario
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Iconos para mostrar/ocultar contraseña

function LoginForm() {
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      {/* Right side with form */}
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#f7f3e9",
            display: "flex",
            alignItems: "center",
            width: "100%", // Aseguramos que el formulario ocupe todo el ancho disponible
            height: "auto", // Dejamos que la altura se ajuste según el contenido
          }}
        >
          {/* Left side with image */}
          <Box
            component="img"
            src={picture}
            alt="Descripción de la imagen"
            sx={{
              width: "50%", // Ajusta para ocupar el 50% del ancho
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid black",
              marginRight: "20px", // Espacio entre la imagen y el formulario
            }}
          />
          
          {/* Right side with form */}
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
              bgcolor: "#ffffff",
              width: "50%", // Ajusta para que ocupe el 50% del ancho
              height: "auto", // Ocupa el 100% de la altura disponible
            }}
          >
            {/* Logo above the form */}
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: "219px", // Ajusta el tamaño del logo
                height: "auto",
                display: "block",
                margin: "0 auto 20px", // Centramos el logo y le damos espacio inferior
              }}
            />

            {/* Título y descripción */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
                mb: 2,
              }}
            >
              Bienvenido otra vez
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "black", textAlign: "center", mb: 3 }}
            >
              Aprende haciendo y motívate a por más teniendo en cuenta tus
              horarios de disposición
            </Typography>

            <Formik
              validationSchema={validationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                console.log(values);
                await loginUser(values);
              }}
            >
              {({ handleChange, handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {/* Campo correo electrónico */}
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      variant="outlined"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{
                        bgcolor: "white",
                        borderRadius: "30px", // Bordes redondeados
                      }}
                    />
                    {/* Campo contraseña */}
                    <TextField
                      fullWidth
                      label="Contraseña"
                      name="password"
                      type={showPassword ? "text" : "password"} // Cambiar el tipo según el estado
                      onChange={handleChange}
                      variant="outlined"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{
                        bgcolor: "white",
                        borderRadius: "30px", // Bordes redondeados
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              onClick={() => setShowPassword((prev) => !prev)} // Cambiar el estado
                              sx={{ color: "black" }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />} {/* Mostrar el ícono según el estado */}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* Botón de submit */}
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        borderRadius: "50px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "black",
                        color: "#ffffff",
                      }}
                    >
                      Entrar
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
            <Typography align="center" sx={{ mt: 3 }}>
              <Link to="/forgetPassword" style={{ color: "#8C6D62" }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Typography>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
