import React, { useContext, useEffect, useState } from 'react';
import { MisCursosContext } from '../../context/MisCursosContext.jsx';

function CreateClaseVideo() {
  const { cursos, unidades } = useContext(MisCursosContext); // Accedemos a cursos y unidades desde el contexto
  const [selectedUnidad, setSelectedUnidad] = useState(""); // Estado para almacenar la unidad seleccionada

  // Cuando se selecciona una unidad en el select
  const handleSelectChange = (event) => {
    setSelectedUnidad(event.target.value);
  };

  // Aquí puedes agregar lógica adicional si quieres mostrar algo relacionado con la unidad seleccionada
  useEffect(() => {
    console.log("Unidad seleccionada:", selectedUnidad);
  }, [selectedUnidad]);

  return (
    <div>
      <h2>Crear Clase en Video</h2>
      {cursos.length > 0 && unidades.length > 0 ? (
        <div>
          <label htmlFor="unidad">Seleccionar Unidad: </label>
          <select
            id="unidad"
            value={selectedUnidad}
            onChange={handleSelectChange}
          >
            <option value="">Seleccione una unidad</option>
            {unidades.map((unidad, index) => (
              <option key={unidad.unidad_id} value={unidad.unidad_id}>
                Unidad {index + 1}: {unidad.unidad_titulo}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Cargando unidades...</p>
      )}
    </div>
  );
}

export default CreateClaseVideo;
