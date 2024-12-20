import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MisCursosContext } from "../../context/MisCursosContext.jsx";
import DescripcionCurso from "../../components/MisCursosComponents/DescripcionCurso.jsx";
import MenuEditsCourse from "../../components/MisCursosComponents/MenuEditsCourse.jsx";
import VideoIntroduccion from "../../components/MisCursosComponents/VideoIntroduccion.jsx";
import ValoracionesEnInstructor from "../../components/MisCursosComponents/ValoracionesEnInstructor.jsx";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { getUnitsAndVideos } = useContext(MisCursosContext);
  const [courseData, setCourseData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // Estado para el video seleccionado

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const data = await getUnitsAndVideos(courseId);
      setCourseData(data);
    };

    fetchCourseDetails();
  }, [courseId, getUnitsAndVideos]);

  if (!courseData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Menú de opciones en la parte superior */}
      <div className="w-full">
        <MenuEditsCourse />
      </div>

      {/* Contenedor principal con la disposición de los elementos */}
      <div className="flex flex-col md:flex-row gap-6 max-w-screen-xl w-full">
        <div className="w-full md:w-[500px]">
          {/* Pasa el video seleccionado al componente de videos */}
          <VideoIntroduccion video={selectedVideo} />
        </div>
        <div className="w-full md:w-[300px]">
          {/* Pasa la función para seleccionar el video */}
          <DescripcionCurso
            course={courseData.course}
            units={courseData.units}
            onVideoSelect={setSelectedVideo} // Función para actualizar el video seleccionado
          />
        </div>
      </div>

      {/* Sección de ValoracionesEnInstructor */}
      <div className="w-full max-w-[1280px] pt-6 ">
        <ValoracionesEnInstructor />
      </div>
    </div>
  );
};


export default CourseDetailsPage;
