import React from "react";

function DescripcionCurso({ course, units }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "left",
          color: "black",
          fontSize: "2rem",
          marginBottom: "20px",
          textDecoration: "underline", // Subraya el título del curso
        }}
      >
        {course.titulo}
      </h1>
      
      {units.map((unit, index) => (
        <div
          key={unit.unidad_id}
          style={{ marginBottom: "30px", borderBottom: "1px solid #DDD", paddingBottom: "20px" }}
        >
          {/* Título de la unidad con numeración */}
          <h2
            style={{
              color: "black",
              fontSize: "1.5rem",
              marginLeft: "20px",
              marginBottom: "15px",
            }}
          >
            Unidad {index + 1}: {unit.unidad_titulo}
          </h2>

          {/* Listado de videos con numeración personalizada */}
          <ul style={{ paddingLeft: "40px" }}>
            {unit.videos.map((video, videoIndex) => (
              <li
                key={video.video_id}
                style={{ fontSize: "1.1rem", color: "#555", marginBottom: "10px" }}
              >
                <span style={{ fontWeight: "bold", color: "#000" }}>
                  {videoIndex + 1}. {video.video_nombre}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DescripcionCurso;
