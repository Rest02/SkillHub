// Perfil.jsx
import React, { useEffect } from "react";
import { usePerfil } from "../../context/PerfilContext"; // Importar el contexto de perfil

function Perfil() {
  const { perfil, getPerfil, loading, error } = usePerfil(); // Obtener la función y el perfil desde el contexto

  useEffect(() => {
    // Obtener los datos del perfil cuando se monte el componente
    if (!perfil) {
      getPerfil();
    }
  }, [perfil, getPerfil]); // Depender de perfil y getPerfil

  if (loading) {
    return <div>Cargando perfil...</div>; // Mostrar un mensaje de carga mientras obtenemos los datos
  }

  if (error) {
    return <div>{error}</div>; // Mostrar un error si algo sale mal
  }

  if (!perfil) {
    return <div>No se pudo obtener el perfil.</div>; // Si no hay perfil, muestra un mensaje de error
  }

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <p>
        <strong>Nombre:</strong> {perfil.nombre}
      </p>
      <p>
        <strong>Email:</strong> {perfil.email}
      </p>
      <p>
        <strong>Rol:</strong> {perfil.rol}
      </p>

      {/* Opciones de cambios */}
      <div style={{ marginTop: "20px" }}>
        <h3>Opciones de Configuración</h3>
        <button onClick={() => alert("Cambiar correo")}>
          Cambiar correo vinculado
        </button>
        <br />
        <button onClick={() => alert("Cambiar contraseña")}>
          Cambiar contraseña
        </button>
        <br />
        <button onClick={() => alert("Cambiar nombre de usuario")}>
          Cambiar nombre de usuario
        </button>
        <br />
        <button onClick={() => alert("Cambiar rol a instructor")}>
          Cambiar rol a instructor
        </button>
      </div>
    </div>
  );
}

export default Perfil;
