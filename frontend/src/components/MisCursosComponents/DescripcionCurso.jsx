import React from "react";

function DescripcionCurso({ course, units }) {
  return (
    <div>
      <h1>{course.titulo}</h1>
      {units.map((unit) => (
        <div key={unit.unidad_id}>
          <h2>{unit.unidad_titulo}</h2>
          <ul>
            {unit.videos.map((video) => (
              <li key={video.video_id}>{video.video_nombre}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DescripcionCurso;
